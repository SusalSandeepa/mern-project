import './App.css'
import ProductCard from './components/productCard.jsx'
function App() {

  return (
    <>
      <h1>Welcome to Pixel Store</h1>
      <ProductCard name="Google Pixel 9 Pro XL" price="$999" image="https://lh3.googleusercontent.com/No79vwxK41bkOz4mwK1KXYr5vrt-M9ONNNpcBx9fbR9MMUGF1aHAd4hXC_PxJPBcL3jiGITI7roQ-eWJsFknfW8evZh-xXvvECA=s3000-w3000-e365-rw-v0-nu" />
      <ProductCard name="Pixel Buds Pro 2" price="$189" image="https://lh3.googleusercontent.com/1Ozxqio-Q5rE-rCGoAFZpmIrhSJFA9Fydv9jhfHKmqCbpxHEIOT7yEaaHWM8bS97KYa6pa-hG-7zHOGUGNB_9JEbSIapl7PY2gwE=s3000-w3000-e365-rw-v0-nu" />
    </>
  )
}

export default App
