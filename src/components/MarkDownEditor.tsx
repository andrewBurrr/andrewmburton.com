import React, {ReactElement, ReactNode, useEffect, useRef, useState} from "react";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { github } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import 'katex/dist/katex.min.css';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import remarkGfm from "remark-gfm";
import {
    Box, Grid, IconButton, Menu, MenuItem, Tab,
    Tabs, TextField, Toolbar, Typography, useTheme
} from "@mui/material";
import {
    Checklist, Code, FormatBold, FormatItalic, FormatListBulleted,
    FormatListNumbered, FormatQuote, InsertLink, Title, MoreHoriz
} from "@mui/icons-material";
import {Project} from "../types/api";

interface TabPanelProps {
    children?: ReactNode;
    index: number;
    value: number;
}

interface RichTextOption {
    icon: ReactNode;
    callback: () => void;
}

const createRichTextOption = (icon: ReactNode, callback: () => void): RichTextOption => ({
    icon,
    callback
});

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            sx={{ minHeight: 378, border: 1, borderColor: 'divider'}}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 0, flexGrow: 1}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </Box>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

interface MarkDownEditorProps {
    content: string;
    onChange: (field: keyof Project, value: string | string[]) => void;
}

const MarkDownEditor: React.FC<MarkDownEditorProps> = ({ content, onChange}) => {
    const theme = useTheme();
    const [currentTab, setCurrentTab] = React.useState(0);
    const toolbarRef = useRef<HTMLDivElement | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
    const [visibleButtons, setVisibleButtons] = useState<ReactElement[]>([]);
    const [hiddenButtons, setHiddenButtons] = useState<ReactElement[]>([]);

    const insertAtCursor = (leftSymbol: string, rightSymbol?: string) => {
        if (textareaRef.current) {
            const selectionStart = textareaRef.current.selectionStart || 0;
            const selectionEnd = textareaRef.current?.selectionEnd || 0;
            const selectedText = content.substring(selectionStart, selectionEnd);
            const textBefore = content.substring(0, selectionStart);
            const textAfter = content.substring(selectionEnd);
            onChange('content', `${textBefore}${leftSymbol}${selectedText}${rightSymbol||''}${textAfter}`);
            const newCursorPos = selectionStart + leftSymbol.length + selectedText.length + (rightSymbol?.length||0);
            textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
            textareaRef.current.focus();
        }
    }

    const insertTitle = () => {
        insertAtCursor('# ', ' #');
    }

    const insertBold = () => {
        insertAtCursor('**','**');
    }

    const insertItalic = () => {
        insertAtCursor('_', '_');
    }

    const insertQuote = () => {
        insertAtCursor('> ');
    }

    const insertCode = () => {
        insertAtCursor('`', '`');
    }

    const insertLink = () => {
        insertAtCursor('[text](url)')
    }

    const insertBulleted = () => {
        insertAtCursor('- ');
    }

    const insertNumbered = () => {
        insertAtCursor('1. ');
    }

    const insertCheckList = () => {
        insertAtCursor('- [ ] ');
    }

    useEffect(() => {
        const richTextOptions = [
            createRichTextOption(<Title/>, insertTitle),
            createRichTextOption(<FormatBold/>, insertBold),
            createRichTextOption(<FormatItalic/>, insertItalic),
            createRichTextOption(<FormatQuote/>, insertQuote),
            createRichTextOption(<Code/>, insertCode),
            createRichTextOption(<InsertLink/>, insertLink),
            createRichTextOption(<FormatListBulleted/>, insertBulleted),
            createRichTextOption(<FormatListNumbered/>, insertNumbered),
            createRichTextOption(<Checklist/>, insertCheckList),
        ];

        const calculateButtons = () => {
            if (toolbarRef.current) {
                const toolbarWidth = toolbarRef.current.offsetWidth;
                const buttonWidth = 48; // Assuming your button width, adjust accordingly
                const maxButtons = Math.floor(toolbarWidth / buttonWidth);

                const visible = richTextOptions
                    .slice(0, maxButtons - 1)
                    .map((option, index) => (
                        <IconButton key={index} onClick={option.callback}>
                            {option.icon}
                        </IconButton>
                    ));

                const hidden = richTextOptions
                    .slice(maxButtons - 1)
                    .map((option, index) => (
                        <MenuItem key={index} onClick={option.callback} sx={{ padding: 1 }}>
                            {option.icon}
                        </MenuItem>
                    ));

                if (!arraysEqual(visible, visibleButtons) || !arraysEqual(hidden, hiddenButtons)) {
                    setVisibleButtons(visible);
                    setHiddenButtons(hidden);
                }
            }
        };

        const arraysEqual = (a: any[], b: any[]) => {
            if (a === b) return true;
            if (a == null || b == null) return false;
            if (a.length !== b.length) return false;
        };

        calculateButtons();
        window.addEventListener('resize', calculateButtons);
        return () => {
            window.removeEventListener('resize', calculateButtons);
        };
    }, [hiddenButtons, visibleButtons]);

    const handleChange = (event: React.SyntheticEvent, newTab: number) => {
        setCurrentTab(newTab);
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setMenuAnchor(event.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuAnchor(null);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Grid container direction="row" justifyContent="space-between" alignItems="center" style={{borderBottom: 1, borderColor: 'divider'}}>
                <Grid item>
                    <Tabs value={currentTab} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Edit" {...a11yProps(0)} />
                        <Tab label="Preview" {...a11yProps(1)} />
                    </Tabs>
                </Grid>
                <Grid item xs>
                    { currentTab === 0 &&
                        <Toolbar ref={toolbarRef} variant="dense" style={{ width: "100%" }} disableGutters>
                            <Grid container justifyContent="flex-end">
                                {visibleButtons.map((option, index) => (
                                    <Grid item key={index}>
                                        {option}
                                    </Grid>
                                ))}
                                <Grid item>
                                    {hiddenButtons.length !== 0 && (
                                        <>
                                            <IconButton onClick={handleMenuOpen}>
                                                <MoreHoriz />
                                            </IconButton>
                                            <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={handleMenuClose}>
                                                {hiddenButtons}
                                            </Menu>
                                        </>
                                    )}
                                </Grid>
                            </Grid>
                        </Toolbar>
                    }
                </Grid>
            </Grid>
            <CustomTabPanel value={currentTab} index={0}>
                <TextField
                    inputRef={textareaRef}
                    multiline
                    rows={15}
                    fullWidth
                    variant="outlined"
                    value={content}
                    onChange={(e) => onChange('content', e.target.value)}
                    sx={{ padding: 0 }}
                />
            </CustomTabPanel>
            <CustomTabPanel value={currentTab} index={1}>
                <ReactMarkdown
                    children={content}
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
                                    fontFamily="Open Sans"
                                    fontStyle="italic"
                                    paddingX={2}
                                    borderLeft={`4px solid ${theme.palette.primary.main}`}
                                    lineHeight={1.6}
                                >
                                    {blockquoteProps.children}
                                </Box>
                            );
                        },
                    }}
                />
            </CustomTabPanel>
        </Box>

    );
}

export { MarkDownEditor };