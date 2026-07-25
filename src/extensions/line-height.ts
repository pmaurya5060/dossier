import { Extension } from "@tiptap/react";

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        lineHeight: {
            setLineHeight: (size: string) => ReturnType;
            unsetLineHeight: () => ReturnType;
        };
    }
}

type LineHeightAttributes = {
    lineHeight?: string | null;
};

export const LineHeightExtension = Extension.create({
    name: "lineHeight",
    addOptions() {
        return {
            types: ["paragraph", "heading"],
            defaultLineHeight: "normal",
        };
    },
    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    lineHeight: {
                        default: this.options.defaultLineHeight,
                        renderHTML: (attributes: LineHeightAttributes) => {
                            if (!attributes.lineHeight || attributes.lineHeight === this.options.defaultLineHeight) {
                                return {};
                            }

                            return {
                                style: `line-height: ${attributes.lineHeight}`,
                            };
                        },
                        parseHTML: (element: HTMLElement) => {
                            return element.style.lineHeight || this.options.defaultLineHeight;
                        },
                    },
                },
            },
        ];
    },
    addCommands() {
        return {
            setLineHeight: (lineHeight: string) => ({ tr, state, dispatch }) => {
                const { selection } = state;
                const { empty } = selection;

                let nextTr = tr;

                if (empty) {
                    const $from = selection.$from;
                    const currentNode = $from.parent;
                    const currentPos = $from.start($from.depth);

                    if (this.options.types.includes(currentNode.type.name)) {
                        nextTr = nextTr.setNodeMarkup(currentPos, undefined, {
                            ...currentNode.attrs,
                            lineHeight,
                        });
                    }
                } else {
                    const { from, to } = selection;

                    state.doc.nodesBetween(from, to, (node, pos) => {
                        if (this.options.types.includes(node.type.name)) {
                            nextTr = nextTr.setNodeMarkup(pos, undefined, {
                                ...node.attrs,
                                lineHeight,
                            });
                        }
                    });
                }

                if (dispatch) {
                    dispatch(nextTr);
                }

                return true;
            },
            unsetLineHeight: () => ({ tr, state, dispatch }) => {
                const { selection } = state;
                const { empty } = selection;

                let nextTr = tr;

                if (empty) {
                    const $from = selection.$from;
                    const currentNode = $from.parent;
                    const currentPos = $from.start($from.depth);

                    if (this.options.types.includes(currentNode.type.name)) {
                        const attrs = { ...currentNode.attrs };
                        delete attrs.lineHeight;

                        nextTr = nextTr.setNodeMarkup(currentPos, undefined, attrs);
                    }
                } else {
                    const { from, to } = selection;

                    state.doc.nodesBetween(from, to, (node, pos) => {
                        if (this.options.types.includes(node.type.name)) {
                            const attrs = { ...node.attrs };
                            delete attrs.lineHeight;

                            nextTr = nextTr.setNodeMarkup(pos, undefined, attrs);
                        }
                    });
                }

                if (dispatch) {
                    dispatch(nextTr);
                }

                return true;
            },
        };
    },
});