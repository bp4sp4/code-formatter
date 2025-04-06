import { format } from "prettier/standalone";
import * as prettierPluginBabel from "prettier/plugins/babel";
import * as prettierPluginHtml from "prettier/plugins/html";
import * as prettierPluginCss from "prettier/plugins/postcss";
import * as prettierPluginEstree from "prettier/plugins/estree";

interface PrettierFormatterProps {
  code: string;
  language: string;
  onFormatted: (formattedCode: string) => void;
}

const PrettierFormatter = ({
  code,
  language,
  onFormatted,
}: PrettierFormatterProps) => {
  const formatCode = async () => {
    try {
      const parser = language === "css" ? "css" : "babel";
      const formatted = await format(code, {
        parser,
        plugins: [
          prettierPluginBabel.default,
          prettierPluginHtml.default,
          prettierPluginCss.default,
          prettierPluginEstree.default,
        ],
        semi: true,
        singleQuote: true,
      });
      onFormatted(formatted);
    } catch (error) {
      console.error("Formatting error:", error);
    }
  };

  // 컴포넌트가 마운트되면 자동으로 포매팅 실행
  formatCode();

  return null; // 이 컴포넌트는 UI를 렌더링하지 않음
};

export default PrettierFormatter;
