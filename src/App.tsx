import ActivityBarConfigurable from "./demos/activity-bar-configurable/page";

function App() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-8">组件库演示</h1>
        <div className="space-y-8">
          {/* 组件展示区域 */}
          <ActivityBarConfigurable />
        </div>
      </main>
    </div>
  )
}

export default App
