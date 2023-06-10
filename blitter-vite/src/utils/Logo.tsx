import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link to='/home'>
      <img
        className='hidden h-8 w-auto lg:block'
        src= '/logo.svg'
        alt='Blitter'
      />
    </Link>
  );
}
