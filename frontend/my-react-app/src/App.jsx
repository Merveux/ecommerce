import { useEffect, useState } from 'react'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/products/')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Products request failed (${response.status})`)
        }
        return response.json()
      })
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch((fetchError) => setError(fetchError.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="min-h-screen px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 border-b border-slate-200 pb-6 sm:mb-10">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">
            Our collection
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Products
          </h1>
          <p className="mt-2 text-slate-600">Browse the products available in our store.</p>
        </header>

        {loading && <p className="py-12 text-center text-slate-600">Loading products…</p>}

        {error && (
          <p role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            Could not load products: {error}
          </p>
        )}

        {!loading && !error && products.length === 0 && (
          <p className="rounded-lg border border-slate-200 bg-white p-8 text-center text-slate-600">
            No products are available yet.
          </p>
        )}

        {!loading && products.length > 0 && (
          <section aria-label="Product list" className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <article
                key={product.id}
                className="flex min-h-52 flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                {product.category?.name && (
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-indigo-600">
                    {product.category.name}
                  </p>
                )}
                <h2 className="text-lg font-semibold leading-snug text-slate-900">
                  {product.name}
                </h2>
                {product.description && (
                  <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
                    {product.description}
                  </p>
                )}
                <p className="mt-5 border-t border-slate-100 pt-4 text-xl font-bold text-slate-900">
                  ${Number(product.price).toFixed(2)}
                </p>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  )
}

export default App
