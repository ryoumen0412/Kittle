'use client';

import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';

interface RichTextEditorProps {
    content: string;
    onChange: (html: string) => void;
    placeholder?: string;
}

interface MenuButtonProps {
    onClick: () => void;
    isActive?: boolean;
    disabled?: boolean;
    title: string;
    children: React.ReactNode;
}

function MenuButton({ onClick, isActive, disabled, title, children }: MenuButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            title={title}
            className={`
                px-2 py-1.5 text-xs font-[family-name:var(--font-pixel)] uppercase
                border-2 transition-all duration-100
                ${isActive
                    ? 'bg-[var(--arcade-cyan)] text-[var(--navy-900)] border-[var(--arcade-cyan)]'
                    : 'bg-transparent text-[var(--text-secondary)] border-[var(--navy-700)] hover:border-[var(--arcade-cyan)] hover:text-[var(--arcade-cyan)]'
                }
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
        >
            {children}
        </button>
    );
}

function MenuBar({ editor }: { editor: Editor | null }) {
    if (!editor) return null;

    return (
        <div className="flex flex-wrap gap-1 p-3 border-b-2 border-[var(--arcade-cyan)] bg-[var(--navy-900)]">
            {/* Text Formatting */}
            <div className="flex gap-1 mr-3">
                <MenuButton
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    isActive={editor.isActive('bold')}
                    title="Negrita (Ctrl+B)"
                >
                    B
                </MenuButton>
                <MenuButton
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    isActive={editor.isActive('italic')}
                    title="Cursiva (Ctrl+I)"
                >
                    I
                </MenuButton>
                <MenuButton
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    isActive={editor.isActive('underline')}
                    title="Subrayado (Ctrl+U)"
                >
                    U
                </MenuButton>
                <MenuButton
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    isActive={editor.isActive('strike')}
                    title="Tachado"
                >
                    S̶
                </MenuButton>
            </div>

            {/* Headings */}
            <div className="flex gap-1 mr-3">
                <MenuButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    isActive={editor.isActive('heading', { level: 1 })}
                    title="Título 1"
                >
                    H1
                </MenuButton>
                <MenuButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    isActive={editor.isActive('heading', { level: 2 })}
                    title="Título 2"
                >
                    H2
                </MenuButton>
                <MenuButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    isActive={editor.isActive('heading', { level: 3 })}
                    title="Título 3"
                >
                    H3
                </MenuButton>
            </div>

            {/* Alignment */}
            <div className="flex gap-1 mr-3">
                <MenuButton
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    isActive={editor.isActive({ textAlign: 'left' })}
                    title="Alinear izquierda"
                >
                    ◀
                </MenuButton>
                <MenuButton
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    isActive={editor.isActive({ textAlign: 'center' })}
                    title="Centrar"
                >
                    ◆
                </MenuButton>
                <MenuButton
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    isActive={editor.isActive({ textAlign: 'right' })}
                    title="Alinear derecha"
                >
                    ▶
                </MenuButton>
            </div>

            {/* Lists */}
            <div className="flex gap-1 mr-3">
                <MenuButton
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    isActive={editor.isActive('bulletList')}
                    title="Lista"
                >
                    •
                </MenuButton>
                <MenuButton
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    isActive={editor.isActive('orderedList')}
                    title="Lista numerada"
                >
                    1.
                </MenuButton>
            </div>

            {/* Block */}
            <div className="flex gap-1 mr-3">
                <MenuButton
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    isActive={editor.isActive('blockquote')}
                    title="Cita"
                >
                    &ldquo;&rdquo;
                </MenuButton>
                <MenuButton
                    onClick={() => editor.chain().focus().setHorizontalRule().run()}
                    title="Línea horizontal"
                >
                    —
                </MenuButton>
                <MenuButton
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    isActive={editor.isActive('codeBlock')}
                    title="Bloque de código"
                >
                    &lt;/&gt;
                </MenuButton>
            </div>

            {/* Undo/Redo */}
            <div className="flex gap-1 ml-auto">
                <MenuButton
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                    title="Deshacer (Ctrl+Z)"
                >
                    ↶
                </MenuButton>
                <MenuButton
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                    title="Rehacer (Ctrl+Y)"
                >
                    ↷
                </MenuButton>
            </div>
        </div>
    );
}

export default function RichTextEditor({ content, onChange, placeholder }: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            Underline,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        content: content || '',
        immediatelyRender: false, // Required for SSR/Next.js to avoid hydration mismatches
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-invert max-w-none min-h-[400px] p-4 focus:outline-none',
            },
        },
    });

    return (
        <div className="border-2 border-[var(--arcade-cyan)] bg-[var(--navy-800)]">
            <MenuBar editor={editor} />
            <div className="rich-text-editor">
                <EditorContent editor={editor} />
                {!content && placeholder && (
                    <div className="absolute top-4 left-4 text-[var(--text-muted)] pointer-events-none">
                        {placeholder}
                    </div>
                )}
            </div>
        </div>
    );
}
