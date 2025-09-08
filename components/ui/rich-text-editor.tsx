"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Toggle } from "@/components/ui/toggle"
import { Bold, Italic, List, ListOrdered } from "lucide-react"
import TextStyle from "@tiptap/extension-text-style"
import Color from "@tiptap/extension-color"
import Underline from "@tiptap/extension-underline"
import TextAlign from "@tiptap/extension-text-align"
import { useEffect, useCallback } from "react"

interface RichTextEditorProps {
  name: string
  control: any
  defaultValue?: string
  placeholder?: string
  className?: string
}

export function RichTextEditor({
  name,
  control,
  defaultValue = "",
  placeholder = "",
  className = "",
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc list-outside ml-4",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal list-outside ml-4",
          },
        },
      }),
      TextStyle,
      Color,
      Underline,
      TextAlign.configure({
        types: ["paragraph", "heading"],
      }),
    ],
    content: defaultValue,
    onUpdate: ({ editor }) => {
      control.onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: `min-h-[100px] w-full rounded-md border border-input bg-zinc-100 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 prose prose-sm max-w-none [&_ul]:list-disc [&_ul]:list-outside [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:list-outside [&_ol]:ml-4 [&_ul_li]:mt-0 [&_ol_li]:mt-0 [&_p]:my-1 [&_ul]:my-1 [&_ol]:my-1 ${className}`,
      },
    },
  })

  const setEditorContent = useCallback(
    (newContent: string) => {
      if (editor && newContent !== editor.getHTML()) {
        editor.commands.setContent(newContent)
      }
    },
    [editor],
  )

  useEffect(() => {
    if (editor && defaultValue !== editor.getHTML()) {
      editor.commands.setContent(defaultValue)
    }
  }, [editor, defaultValue])

  if (!editor) {
    return null
  }

  return (
    <div className="border rounded-md bg-zinc-100">
      <div className="flex items-center gap-1 p-1 border-b">
        <Toggle
          size="sm"
          pressed={editor.isActive("bold")}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
          className="h-8 w-8"
        >
          <Bold className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("italic")}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          className="h-8 w-8"
        >
          <Italic className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("underline")}
          onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
          className="h-8 w-8"
        >
          <span className="underline font-bold">U</span>
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("bulletList")}
          onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
          className="h-8 w-8"
        >
          <List className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("orderedList")}
          onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
          className="h-8 w-8"
        >
          <ListOrdered className="h-4 w-4" />
        </Toggle>
      </div>
      <EditorContent editor={editor} className={`p-2 ${className}`} />
    </div>
  )
}

export default RichTextEditor
