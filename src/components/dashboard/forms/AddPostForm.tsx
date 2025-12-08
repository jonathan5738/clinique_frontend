import { BlockTypeSelect, BoldItalicUnderlineToggles, headingsPlugin, imagePlugin, InsertImage, InsertTable, linkDialogPlugin, linkPlugin, listsPlugin, ListsToggle, markdownShortcutPlugin, MDXEditor, quotePlugin, tablePlugin, toolbarPlugin, UndoRedo, type MDXEditorMethods } from "@mdxeditor/editor";
import {useRef} from "react"
import '@mdxeditor/editor/style.css'

export default function AddPostForm(){
    const ref = useRef<MDXEditorMethods>(null);
    return (
        <div>
        <MDXEditor ref={ref} markdown={ref.current?.getMarkdown() ?? ""} plugins={[
                imagePlugin(),
                tablePlugin(),
                listsPlugin(),
                headingsPlugin(),
                quotePlugin(),
                linkPlugin(),
                linkDialogPlugin(),
                markdownShortcutPlugin(),
                toolbarPlugin({
                    toolbarClassName: "my-classname",
                    toolbarContents : () => (
                        <>
                          <UndoRedo/>
                          <BoldItalicUnderlineToggles/>
                          <BlockTypeSelect/>
                          <InsertImage/>
                          <ListsToggle/>
                          <InsertTable/>
                        </>
                    )
                })
            ]}

             onChange={(mardown, _) => ref.current?.setMarkdown(mardown)}
             />
        </div>
    )
}