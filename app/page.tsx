import VerticalThumb from '@/components/product-slider/vertical-thumb';
import ProductSlider from '../components/product-slider/product-slider';

const slides: {
  src: string;
  alt: string;
}[] = [
  {
    alt: 'slide 1',
    src: 'https://rahem.storage.iran.liara.space/next-js-14.jpg',
  },
  {
    alt: 'slide 2',
    src: 'https://rahem.storage.iran.liara.space/free-images.jpg',
  },
  {
    alt: 'slide 1',
    src: 'https://rahem.storage.iran.liara.space/next-js-14.jpg',
  },
  {
    alt: 'slide 2',
    src: 'https://rahem.storage.iran.liara.space/free-images.jpg',
  },
  {
    alt: 'slide 2',
    src: 'https://rahem.storage.iran.liara.space/free-images.jpg',
  },

  {
    alt: 'slide 2',
    src: 'https://rahem.storage.iran.liara.space/free-images.jpg',
  },
  {
    alt: 'slide 2',
    src: 'https://rahem.storage.iran.liara.space/free-images.jpg',
  },
  {
    alt: 'slide 2',
    src: 'https://rahem.storage.iran.liara.space/free-images.jpg',
  },
  {
    alt: 'slide 2',
    src: 'https://rahem.storage.iran.liara.space/free-images.jpg',
  },
];

const HomePage = () => {
  return (
    <div className='mx-auto mt-12 flex max-w-6xl p-4'>
      <ProductSlider slides={slides} direction='rtl' />
      {/* <VerticalThumb vertical slides={slides} direction='rtl' /> */}
    </div>
  );
};

export default HomePage;
