'use client';

import React, { useState, useMemo } from 'react';
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
  onStatsChange?: (stats: { wordCount: number; charCount: number; readingTimeMinutes: number }) => void;
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
        px-2.5 py-1.5 text-xs font-medium rounded-md transition-all duration-150 flex items-center justify-center min-w-[28px] h-7
        ${
          isActive
            ? 'bg-[var(--accent-burdeo)] text-white shadow-xs font-semibold'
            : 'bg-transparent text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]'
        }
        ${disabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      {children}
    </button>
  );
}

function MenuBar({ editor, isZen, onToggleZen }: { editor: Editor | null; isZen: boolean; onToggleZen: () => void }) {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 p-2 border-b border-[var(--border-subtle)] bg-[var(--bg-surface)] rounded-t-xl">
      <div className="flex flex-wrap items-center gap-1">
        {/* Text Style: Bold, Italic, Underline, Strike */}
        <div className="flex items-center gap-0.5 pr-2 border-r border-[var(--border-subtle)]">
          <MenuButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive('bold')}
            title="Negrita (Ctrl+B)"
          >
            <strong className="font-serif">B</strong>
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive('italic')}
            title="Cursiva (Ctrl+I)"
          >
            <span className="italic font-serif">I</span>
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            isActive={editor.isActive('underline')}
            title="Subrayado (Ctrl+U)"
          >
            <span className="underline">U</span>
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            isActive={editor.isActive('strike')}
            title="Tachado"
          >
            <span className="line-through text-[11px]">S</span>
          </MenuButton>
        </div>

        {/* Headings / Hierarchy */}
        <div className="flex items-center gap-0.5 px-2 border-r border-[var(--border-subtle)]">
          <MenuButton
            onClick={() => editor.chain().focus().setParagraph().run()}
            isActive={editor.isActive('paragraph')}
            title="Párrafo normal"
          >
            P
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            isActive={editor.isActive('heading', { level: 1 })}
            title="Título Principal (H1)"
          >
            H1
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            isActive={editor.isActive('heading', { level: 2 })}
            title="Subtítulo (H2)"
          >
            H2
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            isActive={editor.isActive('heading', { level: 3 })}
            title="Encabezado de Sección (H3)"
          >
            H3
          </MenuButton>
        </div>

        {/* Text Alignment */}
        <div className="flex items-center gap-0.5 px-2 border-r border-[var(--border-subtle)]">
          <MenuButton
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            isActive={editor.isActive({ textAlign: 'left' })}
            title="Alinear a la izquierda"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="15" y2="12" />
              <line x1="3" y1="18" x2="18" y2="18" />
            </svg>
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            isActive={editor.isActive({ textAlign: 'center' })}
            title="Centrar texto"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="6" y1="12" x2="18" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            isActive={editor.isActive({ textAlign: 'right' })}
            title="Alinear a la derecha"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="9" y1="12" x2="21" y2="12" />
              <line x1="6" y1="18" x2="21" y2="18" />
            </svg>
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            isActive={editor.isActive({ textAlign: 'justify' })}
            title="Justificar texto"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </MenuButton>
        </div>

        {/* Lists & Quotes */}
        <div className="flex items-center gap-0.5 px-2 border-r border-[var(--border-subtle)]">
          <MenuButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive('bulletList')}
            title="Lista con viñetas"
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
          <MenuButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive('blockquote')}
            title="Cita editorial (Blockquote)"
          >
            “
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            title="Separador horizontal (Línea)"
          >
            —
          </MenuButton>
        </div>

        {/* Undo / Redo */}
        <div className="flex items-center gap-0.5 pl-2">
          <MenuButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            title="Deshacer (Ctrl+Z)"
          >
            ↩
          </MenuButton>
          <MenuButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            title="Rehacer (Ctrl+Y)"
          >
            ↪
          </MenuButton>
        </div>
      </div>

      {/* Zen Mode Button */}
      <div className="flex items-center">
        <button
          type="button"
          onClick={onToggleZen}
          className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 ${
            isZen
              ? 'bg-[var(--accent-burdeo)] text-white'
              : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]'
          }`}
          title="Modo Escritura Zen a pantalla completa"
        >
          <span>{isZen ? '✕ Salir Zen' : '🪶 Modo Zen'}</span>
        </button>
      </div>
    </div>
  );
}

export default function RichTextEditor({
  content,
  onChange,
  placeholder = 'Comienza a escribir tu obra...',
  onStatsChange,
}: RichTextEditorProps) {
  const [isZen, setIsZen] = useState(false);

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
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);

      const text = editor.getText();
      const words = text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0;
      const chars = text.length;
      const readingMinutes = Math.max(1, Math.ceil(words / 200));

      if (onStatsChange) {
        onStatsChange({
          wordCount: words,
          charCount: chars,
          readingTimeMinutes: readingMinutes,
        });
      }
    },
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none min-h-[380px] p-6 text-[var(--text-primary)] font-serif text-lg leading-relaxed',
      },
    },
  });

  // Calculate stats directly
  const stats = useMemo(() => {
    if (!editor) return { words: 0, chars: 0, time: 1 };
    const text = editor.getText();
    const words = text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0;
    const chars = text.length;
    const time = Math.max(1, Math.ceil(words / 200));
    return { words, chars, time };
  }, [editor?.getText()]);

  return (
    <div
      className={`tiptap-editor-wrapper transition-all duration-200 ${
        isZen
          ? 'fixed inset-0 z-50 bg-[var(--bg-base)] p-4 md:p-12 overflow-y-auto flex flex-col justify-between'
          : 'rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-base)] shadow-card'
      }`}
    >
      <div className={isZen ? 'max-w-4xl mx-auto w-full flex-grow flex flex-col' : ''}>
        <MenuBar editor={editor} isZen={isZen} onToggleZen={() => setIsZen(!isZen)} />

        <div className="relative tiptap-editor flex-grow">
          <EditorContent editor={editor} />
          {!content && placeholder && (
            <div className="absolute top-6 left-6 text-[var(--text-muted)] pointer-events-none font-serif italic text-lg opacity-40">
              {placeholder}
            </div>
          )}
        </div>

        {/* Word count and live metrics footer */}
        <div className="flex items-center justify-between px-4 py-2.5 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] text-xs text-[var(--text-muted)] font-mono rounded-b-xl">
          <div className="flex items-center gap-4">
            <span>{stats.words} palabras</span>
            <span>•</span>
            <span>{stats.chars} caracteres</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Tiempo estimado de lectura:</span>
            <span className="font-semibold text-[var(--text-primary)]">{stats.time} min</span>
          </div>
        </div>
      </div>
    </div>
  );
}
