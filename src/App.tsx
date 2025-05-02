import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Tailwind CSS 配置成功！
        </h1>
        <p className="text-gray-600">
          你现在可以在项目中使用 Tailwind CSS 了。
        </p>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
          开始使用
        </button>
      </div>
    </div>
  );
}

export default App
