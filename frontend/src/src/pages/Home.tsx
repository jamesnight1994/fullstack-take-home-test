import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { BookProps, BookType } from '../components/Book';
import { getBookList } from '../components/utils';
import { Typography } from '@mui/material';


export default function Home() {
  const BooklistContext = React.createContext<BookType[]>(getBookList("booklist"));
  const bookList = React.useContext(BooklistContext);

  console.log(bookList);
  return (
    <TableContainer sx={{ marginLeft: 5, marginTop: 10, width: "auto", alignSelf:"center" }} component={Paper}>
      <Typography variant='h6'>Reading List</Typography>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {(['title', 'readingLevel', 'author'] as const).map((column => (
              <TableCell>{column}</TableCell>
            )))}
          </TableRow>
        </TableHead>
        <TableBody>
          {bookList.map((book, index) => (
            <TableRow
              key={`${book}${index}`}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {(['title', 'readingLevel', 'author'] as const).map((column => (
                <TableCell>
                  {book[column]}
                </TableCell>
              )))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
