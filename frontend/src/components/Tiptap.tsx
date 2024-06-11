import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import ListItem from '@tiptap/extension-list-item';
import Blockquote from '@tiptap/extension-blockquote';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import CodeBlock from '@tiptap/extension-code-block';

const Tiptap = () => {
    const editor = useEditor({
      extensions: [
        StarterKit,
        Heading.configure({
          levels: [1, 2, 3],
        }),
        Bold,
        Italic,
        Blockquote,
        BulletList,
        OrderedList,
        ListItem, // Ensure ListItem is included
        CodeBlock,
      ],
      content: '<p>Enter Content!</p>',
    });
  
  if (!editor) { 
    return null 
  }

  return (
    <div>
      <div className="flex space-x-2 mb-4">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-4 py-2 rounded ${
            editor.isActive('bold') ? 'bg-gray-300' : 'bg-gray-200'
          }`}
        >
          Bold
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-4 py-2 rounded ${
            editor.isActive('italic') ? 'bg-gray-300' : 'bg-gray-200'
          }`}
        >
          Italic
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-4 py-2 rounded ${
            editor.isActive('bulletList') ? 'bg-gray-300' : 'bg-gray-200'
          }`}
        >
          Bullet List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`px-4 py-2 rounded ${
            editor.isActive('orderedList') ? 'bg-gray-300' : 'bg-gray-200'
          }`}
        >
          Ordered List
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`px-4 py-2 rounded ${
            editor.isActive('codeBlock') ? 'bg-gray-300' : 'bg-gray-200'
          }`}
        >
          Code Block
        </button>
      </div>
      <EditorContent editor={editor} className="border border-gray-300 p-5 rounded-lg focus:outline-none" />
    </div>
  );
};

export default Tiptap;