import EmblaCarousel from './embla-carousel';

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
];

const HomePage = () => {
  return (
    <div className='mx-auto mt-12 max-w-lg border flex items-center justify-center border-blue-400 rounded-md p-4'>
      <EmblaCarousel slides={slides} />
    </div>
  );
};

export default HomePage;
