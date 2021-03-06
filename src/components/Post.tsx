import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GraphClient from "../graphClient";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Grid } from "@material-ui/core/";
import { Post } from "./types";

function PostComponent() {
  const { postId } = useParams<string>();
  const client = new GraphClient();
  const [post, setPost] = useState<Post | null>(null);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (typeof postId === "string")
      client.getSinglePost(postId).then((p: Post) => {
        if (p === null) {
          setNotFound(true);
        }
        setPost(p);
        setIsLoading(false);
      });
  }, []);
  if (notFound) {
    return <p>no results matched</p>;
  }
  if (!isLoading && post) {
    return (
      <>
        <Card sx={{ maxWidth: "100%", marginTop: 10, marginBottom: 10 }}>
          <Grid container>
            <Grid item md={6}>
              <CardMedia
                component="img"
                height="100%"
                src={post.coverPhoto.url}
                alt={post.title}
              ></CardMedia>
            </Grid>
            <Grid item md={6}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  author: {post.author.name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {post.content.text}
                </Typography>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </>
    );
  } else {
    return <p>Loading</p>;
  }
}

export default PostComponent;
