import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import { Button, Divider, Grid, Icon } from "@mui/material";
import { useMemo } from "react";

const IconButton = ({ children, ...props }) => {
  return (
    <Button
      variant="outlined"
      size="small"
      sx={{
        padding: 0,
        minWidth: 32,
        width: 32,
        height: 32,
        "&.is-active": { backgroundColor: "primary.main", color: "white" },
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

const TiptapEditor = ({ value, placeholder, onChange }) => {
  const extensions = useMemo(
    () => [
      Placeholder.configure({
        placeholder,
      }),
      TextStyle.configure({ types: [ListItem.name] }),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'right',"justify","center"],
        defaultAlignment: 'left',
      })
    ],
    [placeholder]
  );

  const editor = useEditor({
    extensions,
    content: value,
    onUpdate: ({ editor }) => onChange({ json: editor.getJSON(), html: editor.getHTML() }),
  });

  return (
    <Grid display="flex" flexDirection="column" gap={2} flexGrow={1}>
      {editor && (
        <Grid display="flex" flexWrap="wrap" gap={0.5}>
          <IconButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "is-active" : ""}
          >
            <Icon className="fa-bold" fontSize="small" style={{ fontSize: 16 }} />
          </IconButton>
          <IconButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "is-active" : ""}
          >
            <Icon className="fa-italic" fontSize="small" style={{ fontSize: 16 }} />
          </IconButton>
          <IconButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? "is-active" : ""}
          >
            <Icon className="fa-strikethrough" fontSize="small" style={{ fontSize: 16 }} />
          </IconButton>
          {/* Botones de justificación de texto */}
          <Divider flexItem orientation="vertical" sx={{ marginX: 1 }} />
          <IconButton
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={editor.isActive({ textAlign: "left" }) ? "is-active" : ""}
          >
            <Icon className="fa-align-left" fontSize="small" style={{ fontSize: 16 }} />
          </IconButton>
          <IconButton
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={editor.isActive({ textAlign: "center" }) ? "is-active" : ""}
          >
            <Icon className="fa-align-center" fontSize="small" style={{ fontSize: 16 }} />
          </IconButton>
          <IconButton
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={editor.isActive({ textAlign: "right" }) ? "is-active" : ""}
          >
            <Icon className="fa-align-right" fontSize="small" style={{ fontSize: 16 }} />
          </IconButton>
          <IconButton
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            className={editor.isActive({ textAlign: "justify" }) ? "is-active" : ""}
          >
            <Icon className="fa-align-justify" fontSize="small" style={{ fontSize: 16 }} />
          </IconButton>
          {/* Resto de los botones */}
          <Divider flexItem orientation="vertical" sx={{ marginX: 1 }} />
          <IconButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "is-active" : ""}
          >
            <Icon className="fa-list-ul" fontSize="small" style={{ fontSize: 16 }} />
          </IconButton>
          <IconButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive("orderedList") ? "is-active" : ""}
          >
            <Icon className="fa-list-ol" fontSize="small" style={{ fontSize: 16 }} />
          </IconButton>
          <IconButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive("blockquote") ? "is-active" : ""}
          >
            <Icon className="fa-quote-right" fontSize="small" style={{ fontSize: 16 }} />
          </IconButton>
          <IconButton onClick={() => editor.chain().focus().setHorizontalRule().run()}>
            <Icon className="fa-horizontal-rule" fontSize="small" style={{ fontSize: 16 }} />
          </IconButton>
          <IconButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
          >
            <Icon className="fa-undo" fontSize="small" style={{ fontSize: 16 }} />
          </IconButton>
          <IconButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
          >
            <Icon className="fa-redo" fontSize="small" style={{ fontSize: 16 }} />
          </IconButton>
        </Grid>
      )}
      <EditorContent editor={editor} label="H" style={{ width: "100%" }} />
    </Grid>
  );
};

export default TiptapEditor;
