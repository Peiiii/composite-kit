import ActivityBarComposite from "./demos/activity-bar-composite/page"

function App() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-8">组件库演示</h1>
        <div className="space-y-12">
          {/* Activity Bar Composite Demo */}
          <section className="rounded-lg border bg-card shadow-sm">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-semibold">Activity Bar (复合组件模式)</h2>
            </div>
            <div className="h-[600px]">
              <ActivityBarComposite />
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default App
