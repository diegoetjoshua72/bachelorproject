// Uses reqwest::blocking::Client::head to get the Content-Length of the response.
//
//CA ME CASSE LE COUILLES LA GO TEST CA

use error_chain::error_chain;
use reqwest::header::{HeaderValue, CONTENT_LENGTH, RANGE};
use reqwest::StatusCode;
// use std::fs::File;
use log::{info, trace, warn, Level};
use std::io::Read;
use std::str::FromStr;

error_chain! {
    foreign_links {
        Io(std::io::Error);
        Reqwest(reqwest::Error);
        Header(reqwest::header::ToStrError);
    }
}

struct PartialRangeIter {
    start: u64,
    end: u64,
    buffer_size: u32,
}

impl PartialRangeIter {
    pub fn new(start: u64, end: u64, buffer_size: u32) -> Result<Self> {
        if buffer_size == 0 {
            Err("invalid buffer_size, give a value greater than zero.")?;
        }
        Ok(PartialRangeIter {
            start,
            end,
            buffer_size,
        })
    }
}

impl Iterator for PartialRangeIter {
    type Item = HeaderValue;
    fn next(&mut self) -> Option<Self::Item> {
        if self.start > self.end {
            None
        } else {
            let prev_start = self.start;
            self.start += std::cmp::min(self.buffer_size as u64, self.end - self.start + 1);
            Some(
                HeaderValue::from_str(&format!("bytes={}-{}", prev_start, self.start - 1))
                    .expect("string provided by format!"),
            )
        }
    }
}

pub async fn get_program_text(url: &String) -> Result<std::io::Cursor<Vec<u8>>> {
    let client = reqwest::Client::new();
    let response = client.head(url).send().await?; //make a head request
    let length = response //reqwest response
        .headers()
        .get(CONTENT_LENGTH)
        .ok_or("response does not include the content length")?;
    let length = u64::from_str(length.to_str()?).map_err(|_| "invalid Content-Length header")?;

    let mut buffer: Vec<u8> = vec![];

    info!("content_length we are fetching  : {}", length);
    let mut response_get = client.get(url).send().await?;
    let status = response_get.status();
    if !(status == StatusCode::OK || status == StatusCode::PARTIAL_CONTENT) {
        error_chain::bail!("Unexpected server response: {}", status)
    }

    // for range in PartialRangeIter::new(0, length - 1, chunk_size)? {
    //     // info!("range {:?}", range);
    //     // let mut headers = HeaderMap::new() //verify if the headers are good
    //     // header(RANGE, range)
    //     //now i don't have the issue anymore with the CORS
    //     let mut response = client.get(url).send().await?;
    //     let status = response.status();
    //     if !(status == StatusCode::OK || status == StatusCode::PARTIAL_CONTENT) {
    //         error_chain::bail!("Unexpected server response: {}", status)
    //     }
    //     info!("FIRST COPY : {:?}", buffer);
    // }
    // let content = response_get.text().await?;
    std::io::copy(&mut response_get.text().await?.as_bytes(), &mut buffer)?;
    // std::io::copy(&mut content.as_bytes(), &mut buffer)?;
    let mut program_text = std::io::Cursor::new(buffer);
    let mut result = String::new();

    // info!(
    //     "content program_text: {:?} content result -> {}",
    //     program_text.read_to_string(&mut result).unwrap(),
    //     result
    // );

    println!("Finished with success!");
    return Ok(program_text);
}
