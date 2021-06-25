<template>
  <div class="quill-editor">
    <slot name="toolbar" />
    <div ref="editor" />
  </div>
</template>

<script>
import _Quill from "quill";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import undo_icon from "quill/assets/icons/undo.svg";
import redo_icon from "quill/assets/icons/redo.svg";

const Quill = window.Quill || _Quill;
var icons = Quill.import("ui/icons");
icons["undo"] = undo_icon;
icons["redo"] = redo_icon;
var Size = Quill.import("attributors/style/size");
Size.whitelist = ["14px", "16px", "18px"];
Quill.register(Size, true);

const defaultOptions = {
  theme: "snow",
  boundary: document.body,
  modules: {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ size: ["14px", "16px", "18px"] }],
      [({ header: 1 }, { header: 2 })],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ["clean"],
      ["blockquote", "code-block", "link", "image", "video"],
    ],
    history: {
      delay: 2000,
      maxStack: 500,
      userOnly: true,
    },
  },
  placeholder: "Insert text here ...",
  readOnly: false,
};

if (typeof Object.assign != "function") {
  Object.defineProperty(Object, "assign", {
    value(target) {
      if (target == null) {
        throw new TypeError("Cannot convert undefined or null to object");
      }
      const to = Object(target);
      for (let index = 1; index < arguments.length; index++) {
        const nextSource = arguments[index];
        if (nextSource != null) {
          for (const nextKey in nextSource) {
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true,
  });
}

export default {
  name: "Rich-text",
  data() {
    return {
      options2: {},
      content2: "",
      defaultOptions,
    };
  },
  props: {
    content: String,
    value: String,
    disabled: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    globalOptions: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  mounted() {
    this.initialize();
  },
  beforeDestroy() {
    this.quill = null;
    delete this.quill;
  },
  methods: {
    initialize() {
      if (this.$el) {
        this.options2 = Object.assign(
          {},
          this.defaultOptions,
          this.globalOptions,
          this.options
        );

        this.quill = new Quill(this.$refs.editor, this.options2);

        this.quill.enable(false);

        if (this.value || this.content) {
          this.quill.pasteHTML(this.value || this.content);
        }

        if (!this.disabled) {
          this.quill.enable(true);
        }

        this.quill.on("selection-change", (range) => {
          if (!range) {
            this.$emit("blur", this.quill);
          } else {
            this.$emit("focus", this.quill);
          }
        });

        this.quill.on("text-change", () => {
          let html = this.$refs.editor.children[0].innerHTML;
          const quill = this.quill;
          const text = this.quill.getText();
          if (html === "<p><br></p>") html = "";
          this.content2 = html;
          this.$emit("input", this.content2);
          this.$emit("change", { html, text, quill });
        });

        this.$emit("ready", this.quill);
      }
    },
  },
  watch: {
    content(newVal) {
      if (this.quill) {
        if (newVal && newVal !== this.content2) {
          this.content2 = newVal;
          this.quill.pasteHTML(newVal);
        } else if (!newVal) {
          this.quill.setText("");
        }
      }
    },
    value(newVal) {
      if (this.quill) {
        if (newVal && newVal !== this.content2) {
          this.content2 = newVal;
          this.quill.pasteHTML(newVal);
        } else if (!newVal) {
          this.quill.setText("");
        }
      }
    },
    disabled(newVal) {
      if (this.quill) {
        this.quill.enable(!newVal);
      }
    },
  },
};
</script>yanr
