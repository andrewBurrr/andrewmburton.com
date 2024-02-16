import {useNavigate, useParams} from "react-router-dom";
import {Box, Button, Divider, Grid, Stack, Typography, useTheme} from "@mui/material";
import {useBlog} from "../../contexts/BlogContext";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import SyntaxHighlighter from "react-syntax-highlighter";
import {github} from "react-syntax-highlighter/dist/cjs/styles/hljs";
import ReactMarkdown from "react-markdown";
import React, {useEffect, useState} from "react";
import {Post} from "../../types/api";

const PostDetails = () => {
    const theme = useTheme();
    const { postId } = useParams();
    const { data } = useBlog();
    const [post, setPost] = useState<Post | null>(null);

    useEffect(() => {
        if (data && postId) {
            setPost(data[postId]);
        }
    }, [data]);


    return (
        <Box sx={{ minHeight: `calc(100vh - 91px)`, paddingY: 5 }}>
            <Grid container justifyContent="center" alignItems="center">
                { post && (
                    <Grid item xs={11} sm={9} md={7} lg={5}>
                        <Box sx={{ boxShadow: 3, overflow: "hidden", position: "relative", width: "100%", paddingBottom: "56.25%" }}>
                            <img src={post.thumbnailURL} width="100%" style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover" }}/>
                        </Box>
                        <Box paddingY={2}>
                            <Typography variant="h3" color={theme.palette.primary.light} fontWeight="bold" fontFamily="Montserrat">{post.title}</Typography>
                            { post.createdAt && <Typography variant="caption" fontFamily="Montserrat" fontStyle="oblique">Posted {post.createdAt.toDate().toLocaleDateString('en-US', {month: "long", day: "numeric", year: "numeric"})}</Typography> }
                        </Box>
                        <Typography variant="body1" paddingBottom={4}>
                            <>
                                <span style={{ color: theme.palette.secondary.main }}>Quick Summary</span> &mdash; <i>{post.description}</i>
                            </>
                        </Typography>
                        <Divider orientation="horizontal" />
                        <Box fontFamily="Montserrat" sx={{ color: "rgba(0,0,0,0.8)"}}>
                            <ReactMarkdown
                                children={post.content}
                                remarkPlugins={[remarkMath, remarkGfm]}
                                rehypePlugins={[rehypeKatex]}
                                components={{
                                    code(props) {
                                        const {children, className, node, ...rest} = props;
                                        const match = /language-(\w+)/.exec(className || '');
                                        return match ? (
                                            <SyntaxHighlighter
                                                {...rest}
                                                PreTag="div"
                                                children={String(children).replace(/\n$/, '')}
                                                language={match[1]}
                                                style={github}
                                                ref={null}
                                            />
                                        ) : (
                                            <code {...rest} className={className}>
                                                {children}
                                            </code>
                                        );
                                    },
                                    blockquote(blockquoteProps) {
                                        return (
                                            <Box
                                                width="90%"
                                                marginY="0"
                                                fontStyle="italic"
                                                paddingX={2}
                                                paddingY={0.1}
                                                borderLeft={`6px solid ${theme.palette.primary.light}`}
                                                lineHeight={1.6}
                                                bgcolor="rgb(248,248,248)"
                                                borderRadius="6px"
                                                boxShadow={3}
                                            >
                                                {blockquoteProps.children}
                                            </Box>
                                        );
                                    },
                                }}
                            />
                            <Typography variant="subtitle2" gutterBottom>Related Topics:</Typography>
                            <Box width="100%" borderRadius="6px" bgcolor={`rgba(0,0,0,0.075)`}>
                                <Stack direction="row" alignItems="center" justifyContent="flex-start" spacing={1} padding={0.75}>
                                    {post.tags.map((tag, i) => (
                                        <Box
                                            key={i}
                                            paddingX={2}
                                            paddingY={0.5}
                                            sx={{ bgcolor: theme.palette.primary.light, color: theme.palette.getContrastText(theme.palette.primary.light), borderRadius: "6px" }}
                                        >
                                            <Typography variant="button">
                                                {tag}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Stack>
                            </Box>
                        </Box>
                    </Grid>
                ) }
            </Grid>
        </Box>
    );
}

export { PostDetails };