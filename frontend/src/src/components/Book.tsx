import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { addBookToList, bookExistsInList, removeBookFromList } from './utils';
import { Divider } from '@mui/material';

export type BookType = {
    author: string,
    coverPhotoURL: string,
    readingLevel: string,
    title: string,
}

export type BookProps = {
    book: BookType
};

export default function Book(props: BookProps) {
    const { title, coverPhotoURL, author, readingLevel } = props.book;
    const [enlisted, setEnlisted] = React.useState(false);




    React.useEffect(() => {
        const isEnlisted = bookExistsInList("booklist", props.book);
        setEnlisted(isEnlisted);
    });

    function add() {
        addBookToList("booklist", props.book);
        setEnlisted(true);
    }

    function remove() {
        removeBookFromList("booklist", props.book);
        setEnlisted(false);
    }


    return (
        <Card sx={{
            minHeight: 400,
            minWidth: 200,
            maxHeight: 250,
            maxWidth: 300
        }}>
            <CardMedia
                sx={{ height: 175 }}
                image={coverPhotoURL}
                title={title}
            />
            <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Author: {author},
                    Reading level: {readingLevel}
                </Typography>
            </CardContent>
            <CardActions>
                {!enlisted ? (

                    <Button
                        onClick={() => add()}
                        size="small"
                        variant="contained"
                        color="inherit"
                    >
                        Add to List
                    </Button>
                ) : (

                    <Button
                        onClick={() => remove()}
                        size="small"
                        variant="outlined"
                        color="warning"
                    >
                        Remove from List
                    </Button>
                )}
                <Button size="small">More</Button>
            </CardActions>
        </Card>
    );
}
