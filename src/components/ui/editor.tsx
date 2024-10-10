"use client";

import {
  EditorBubble,
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  EditorRoot,
  type JSONContent,
} from "novel";
import { NodeSelector } from "./node-selector";
import { LinkSelector } from "./link-selector";
import { TextButtons } from "./text-buttons";
import { defaultExtensions } from "@/lib/extensions";
import { useState } from "react";
import { handleCommandNavigation } from "novel/extensions";

import { slashCommand, suggestionItems } from "./slash-commands";

interface EditorProps {
  initialContent?: JSONContent;
}

const Editor: React.FC<EditorProps> = ({ initialContent }) => {
  const [content, setContent] = useState<JSONContent | null>(
    initialContent ?? null,
  );

  const extensions = [...defaultExtensions, slashCommand];

  const [openNode, setOpenNode] = useState(false);
  const [openLink, setOpenLink] = useState(false);

  return (
    <EditorRoot>
      <div className="m-2 flex h-[calc(100vh-20vh)] flex-col overflow-hidden overflow-y-auto">
        <EditorContent
          extensions={extensions}
          immediatelyRender={false}
          initialContent={content ?? undefined}
          editorProps={{
            handleDOMEvents: {
              keydown: (_view, event) => handleCommandNavigation(event),
            },
            attributes: {
              class:
                "prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert prose-headings:font-heading font-default focus:outline-none max-w-full w-full absolute inset-0 overflow-y-hidden overflow-hidden",
            },
          }}
          onUpdate={({ editor }) => {
            const json = editor.getJSON();
            console.log(json);
            setContent(json);
          }}
        >
          <EditorBubble
            tippyOptions={{
              placement: "bottom-start",
            }}
            className="flex w-fit max-w-[90vw] overflow-hidden rounded border border-muted bg-background shadow-xl"
          >
            <NodeSelector open={openNode} onOpenChange={setOpenNode} />
            <LinkSelector open={openLink} onOpenChange={setOpenLink} />
            <TextButtons />
          </EditorBubble>
        </EditorContent>
      </div>
      <EditorCommand className="relative z-50 h-auto max-h-[330px] w-72 overflow-y-auto rounded-md border border-border bg-background px-1 py-2 shadow-md transition-all">
        <EditorCommandEmpty className="px-2 text-sm text-muted-foreground">
          No results
        </EditorCommandEmpty>
        <EditorCommandList>
          {suggestionItems.map((item) => (
            <EditorCommandItem
              value={item.title}
              onCommand={(val) =>
                item.command ? item.command(val) : undefined
              }
              className="flex w-full items-center space-x-2 rounded-sm px-2 py-1 text-left text-sm text-accent-foreground hover:bg-accent hover:text-accent-foreground aria-selected:bg-accent aria-selected:text-accent-foreground"
              key={item.title}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background text-muted-foreground">
                {item.icon}
              </div>
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-xs text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </EditorCommandItem>
          ))}
        </EditorCommandList>
      </EditorCommand>
    </EditorRoot>
  );
};

export default Editor;
