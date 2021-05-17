use super::lazy_fetch;
use nom::error::VerboseError;
use nom::{Err, IResult, Offset};
use std::io::{self, Read};

/// Buffered parsing of a sequence of items.
pub struct FetchBuffer<R, P, F> {
    pub buf: circular::Buffer,
    pub read_R: R,
    pub read: std::io::Cursor<Vec<u8>>,
    pub parse: P,
    pub fail: F,
    pub urls: Vec<String>,
    pub file_counter: usize,
}

impl<R: Read, P, F> FetchBuffer<R, P, F> {
    /// Fill the circular buffer until the reader returns no more data.
    ///
    /// Some readers, most notably `std::io::stdin()`,
    /// read only a fixed number of bytes regardless of the space they write to.
    /// Therefore, we repeat reading until either
    /// the buffer is full or
    /// the reader returns no data.
    /// This particularly helps the performance when parsing from stdin.

    //for me this functino needs to change rather than reading a file we need to fetch on the web so
    //there are two cases one in which we might need to call fill again from the vec because we ran out of space and the file was too large and one case
    //in which we need to fetch from a new url

    //we need to a way to know how much of teh vector that we are curretnly reading is left to read
    //and how many more files there are left to read

    fn number_of_files_left(&self) -> usize {
        return self.urls.len() - self.file_counter;
    }
    fn number_of_bytes_left_in_file(&self) -> usize {
        return 0;
    }

    pub async fn new_read(&mut self) {
        //make this work this is quite interesting more than debug js so i will do this tomorow morning what a banger
        self.read = lazy_fetch::get_program_text(&program.dependency_url_list[self.file_counter])
            .await
            .unwrap();
        self.file_counter += 1;
    }

    pub fn fill(&mut self) -> io::Result<usize> {
        let mut total_read_bytes = 0;

        loop {
            // read from file to free space of buffer
            let read_bytes = self.read.read(self.buf.space())?;
            //println!("Read {} bytes from file", read_bytes);

            self.buf.fill(read_bytes);
            total_read_bytes += read_bytes;
            if read_bytes == 0 || self.buf.available_space() == 0 {
                break Ok(total_read_bytes);
            }
        }
    }
}

impl<O, E, R: Read, P, F> Iterator for FetchBuffer<R, P, F>
where
    P: Fn(&[u8]) -> IResult<&[u8], O, VerboseError<&[u8]>>,
    F: Fn(nom::Err<VerboseError<&[u8]>>) -> E,
{
    type Item = Result<O, E>;

    fn next(&mut self) -> Option<Self::Item> {
        let (consumed, result) = loop {
            match (self.parse)(self.buf.data()) {
                Err(Err::Incomplete(n)) => {
                    // ensure that we have some space available in the buffer
                    if self.buf.available_space() == 0 {
                        if self.buf.position() == 0 {
                            // double buffer capacity
                            self.buf.grow(self.buf.capacity() * 2);
                            log::warn!("Grown buffer size to {}", self.buf.capacity());
                        } else {
                            self.buf.shift();
                        }
                    }

                    let read_bytes = self.fill().unwrap();

                    if self.buf.available_data() == 0 {
                        // no more data to read or parse, stopping the reading loop
                        break (0, None);
                    } else if read_bytes == 0 {
                        break (0, Some(Err((self.fail)(Err::Incomplete(n)))));
                    }

                    log::warn!("Retrying incomplete parse; consider increasing buffer size");
                }

                Err(e) => break (0, Some(Err((self.fail)(e)))),

                Ok((remaining, toplevel)) => {
                    break (self.buf.data().offset(remaining), Some(Ok(toplevel)));
                }
            }
        };

        self.buf.consume_noshift(consumed);
        // shift and refill buffer if we consumed more than half of its capacity
        if self.buf.position() > self.buf.capacity() / 2 {
            log::debug!(
                "Shift and refill at {} / {}",
                self.buf.position(),
                self.buf.capacity()
            );
            self.buf.shift();
            self.fill().unwrap();
        }

        result
    }
}
