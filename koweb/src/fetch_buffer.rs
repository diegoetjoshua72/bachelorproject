// use super::lazy_fetch;
// use log::{info, trace, warn, Level};
// use nom::error::VerboseError;
// use nom::{Err, IResult, Offset};
// use std::io::{self, Read};

// /// Buffered parsing of a sequence of items.
// pub struct FetchBuffer<R, P, F> {
//     pub buf: circular::Buffer,
//     pub read_r: R,
//     pub read: std::io::Cursor<Vec<u8>>,
//     pub parse: P,
//     pub fail: F,
//     // pub current_name: String,
//     pub urls: Vec<String>,
//     pub file_counter: usize,
// }

// impl<R: Read, P, F> FetchBuffer<R, P, F> {

//     fn number_of_files_left(&self) -> usize {
//         return self.urls.len() - self.file_counter;
//     }

//     fn number_of_bytes_left_in_file(&self, already_read_bytes: usize) -> usize {
//         let reef = self.read.clone();
//         let reef2 = self.read.clone();
//         info!(
//             "THIS IS HOW MANY BYTES ARE IN THE FILE {}",
//             reef.into_inner().len()
//         );

//         info!(
//             "This is how many bytes are left in the file : {} ",
//             reef2.into_inner().len() - already_read_bytes
//         );
//         return 0;
//     }

//     pub async fn new_read(&mut self) {
//         self.read = lazy_fetch::get_program_text(&self.urls[self.file_counter])
//             .await
//             .unwrap();
//         self.file_counter += 1;
//     }

//     pub async fn fill(&mut self) -> io::Result<usize> {
//         let mut total_read_bytes = 0;

//         loop {
//             // read from file to free space of buffer
//             let read_bytes = self.read.read(self.buf.space())?;
//             println!("Read {} bytes from file", read_bytes);
//             println!(
//                 "Number of bytes left in the file {}",
//                 self.number_of_bytes_left_in_file(read_bytes)
//             );
//             println!(
//                 "Number of files left to read {}",
//                 self.number_of_files_left()
//             );
//             self.buf.fill(read_bytes);
//             total_read_bytes += read_bytes;

//             if read_bytes == 0 || self.buf.available_space() == 0 {
//                 info!("we got to the end of the file breaking out of fill");
//                 //TODO but if i update it here then its just going to read everything at once oh no because then i just break ok ok
//                 if self.urls.len() != self.file_counter + 1 {
//                     info!("there are more files to read");
//                     self.file_counter += 1;
//                     self.new_read();
//                 }
//                 break Ok(total_read_bytes);
//             } else {
//                 info!("this is how many bytes we read -> {}", total_read_bytes);
//             }
//         }
//     }
// }

// //looks like stream is what i am looking for
// // use std::stream::Stream;

// // impl<O, E, R: Read, P, F> Stream for FetchBuffer<R, P, F>
// // where
// //     P: Fn(&[u8]) -> IResult<&[u8], O, VerboseError<&[u8]>>,
// //     F: Fn(nom::Err<VerboseError<&[u8]>>) -> E,
// // {
// // }

// impl<O, E, R: Read, P, F> Iterator for FetchBuffer<R, P, F>
// where
//     P: Fn(&[u8]) -> IResult<&[u8], O, VerboseError<&[u8]>>,
//     F: Fn(nom::Err<VerboseError<&[u8]>>) -> E,
// {
//     type Item = Result<O, E>;
//     //calling next once starts a loop hmmmm
//     //that is a bit of a strange way to implement iterator
//     //maybe it is possible to do it without the trait then non pas vraiment le reste depends beaucoup la desus
//     //

//     fn next(&mut self) -> Option<Self::Item> {
//         let (consumed, result) = loop {
//             match (self.parse)(self.buf.data()) {
//                 Err(Err::Incomplete(n)) => {
//                     // ensure that we have some space available in the buffer
//                     if self.buf.available_space() == 0 {
//                         if self.buf.position() == 0 {
//                             // double buffer capacity
//                             self.buf.grow(self.buf.capacity() * 2);
//                             log::warn!("Grown buffer size to {}", self.buf.capacity());
//                         } else {
//                             self.buf.shift();
//                         }
//                     }

//                     wasm_bindgen_futures::spawn_local(async {
//                         let test = self.fill().await.unwrap();
//                         info!(
//                             "well this is what i got in test not sure when it returns -> {}",
//                             test
//                         )()
//                     });
//                     let read_bytes = 0;
//                     // info!("this is read bytes right now ")

//                     if self.buf.available_data() == 0 {
//                         // no more data to read or parse, stopping the reading loop

//                         break (0, None);
//                     } else if read_bytes == 0 {
//                         break (0, Some(Err((self.fail)(Err::Incomplete(n)))));
//                     }

//                     log::warn!("Retrying incomplete parse; consider increasing buffer size");
//                 }

//                 Err(e) => break (0, Some(Err((self.fail)(e)))),

//                 Ok((remaining, toplevel)) => {
//                     break (self.buf.data().offset(remaining), Some(Ok(toplevel)));
//                 }
//             }
//         };

//         self.buf.consume_noshift(consumed);
//         // shift and refill buffer if we consumed more than half of its capacity
//         if self.buf.position() > self.buf.capacity() / 2 {
//             log::debug!(
//                 "Shift and refill at {} / {}",
//                 self.buf.position(),
//                 self.buf.capacity()
//             );
//             self.buf.shift();
//             wasm_bindgen_futures::spawn_local(async {
//                 let test = self.fill().await.unwrap();
//                 info!(
//                     "well this is what i got in test not sure when it returns -> {}",
//                     test
//                 )()
//             });
//         }

//         result
//     }
// }
