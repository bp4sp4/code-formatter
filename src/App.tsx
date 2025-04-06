import { useState, useRef, useEffect, lazy, Suspense } from "react";
import styled from "@emotion/styled";
import { initializeAds } from "./utils/ads";
import Footer from "./components/Footer";

// 지연 로딩을 위한 컴포넌트 분리
const MonacoEditor = lazy(() => import("@monaco-editor/react"));
const PrettierFormatter = lazy(() => import("./components/PrettierFormatter"));

const Container = styled.div`
  max-width: 2400px;
  padding: 2rem;
  display: grid;
  grid-template-columns: 250px 1fr 250px;
  gap: 2rem;

  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

const MainContent = styled.main`
  width: 100%;
  flex: 1;
  min-height: 85vh;
`;

const Sidebar = styled.aside`
  @media (max-width: 1200px) {
    display: none;
  }
`;

const AdContainer = styled.div`
  width: 250px;
  height: 800px;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
  margin-bottom: 1rem;

  @media (max-width: 1200px) {
    display: none;
  }
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: #333;
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const Controls = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const Select = styled.select`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const HiddenInput = styled.input`
  display: none;
`;

const EditorContainer = styled.div`
  height: 800px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 800px;
  background-color: #f5f5f5;
  border-radius: 4px;
`;

const LoadingText = styled.p`
  font-size: 1.2rem;
  color: #666;
`;

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

function App() {
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState("vs-dark");
  const [showFormatter, setShowFormatter] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    initializeAds();
  }, []);

  const handleFormat = () => {
    setShowFormatter(true);
  };

  const handleFormatted = (formattedCode: string) => {
    setInput(formattedCode);
    setShowFormatter(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setInput(content);

        // 파일 확장자에 따라 언어 자동 설정
        const extension = file.name.split(".").pop()?.toLowerCase();
        if (extension) {
          switch (extension) {
            case "js":
              setLanguage("javascript");
              break;
            case "ts":
              setLanguage("typescript");
              break;
            case "html":
              setLanguage("html");
              break;
            case "css":
              setLanguage("css");
              break;
            case "json":
              setLanguage("json");
              break;
          }
        }
      };
      reader.readAsText(file);
    }
  };

  const handleDownload = () => {
    const extension =
      language === "typescript"
        ? "ts"
        : language === "javascript"
          ? "js"
          : language === "html"
            ? "html"
            : language === "css"
              ? "css"
              : language === "json"
                ? "json"
                : "txt";

    const blob = new Blob([input], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `formatted-code.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <AppContainer>
      <Container>
        <Sidebar>
          <AdContainer id="sidebar-ad" />
        </Sidebar>
        <MainContent>
          <Header>
            <Title>코드 포매터</Title>
            <p>
              JavaScript, TypeScript, HTML, CSS, JSON 코드를 쉽고 빠르게
              포매팅하세요
            </p>
          </Header>
          <Controls>
            <Select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="html">HTML</option>
              <option value="css">CSS</option>
              <option value="json">JSON</option>
            </Select>
            <Select value={theme} onChange={(e) => setTheme(e.target.value)}>
              <option value="vs-dark">Dark</option>
              <option value="vs-light">Light</option>
            </Select>
            <ButtonGroup>
              <Button onClick={handleFormat}>Format Code</Button>
              <Button onClick={() => fileInputRef.current?.click()}>
                Upload File
              </Button>
              <Button onClick={handleDownload}>Download</Button>
            </ButtonGroup>
            <HiddenInput
              id="file-upload"
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".js,.ts,.html,.css,.json,.txt"
            />
          </Controls>
          <EditorContainer>
            <Suspense
              fallback={
                <LoadingContainer>
                  <LoadingText>에디터 로딩 중...</LoadingText>
                </LoadingContainer>
              }
            >
              <MonacoEditor
                height="100%"
                defaultLanguage="javascript"
                language={language}
                theme={theme}
                value={input}
                onChange={(value) => setInput(value || "")}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: "on",
                  roundedSelection: false,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            </Suspense>
          </EditorContainer>

          {showFormatter && (
            <Suspense fallback={null}>
              <PrettierFormatter
                code={input}
                language={language}
                onFormatted={handleFormatted}
              />
            </Suspense>
          )}
        </MainContent>
        <Sidebar>
          <AdContainer id="sidebar-ad-2" />
        </Sidebar>
      </Container>
      <Footer />
    </AppContainer>
  );
}

export default App;
