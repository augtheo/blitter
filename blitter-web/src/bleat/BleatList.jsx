import axios from '../utils/axios';
import BleatCard from './BleatCard';
import { useEffect } from 'react';

export default function BleatList({
  bleats,
  setBleats,
  currentPage,
  setTotalResults,
}) {
  useEffect(() => {
    const f = async () => {
      try {
        const response = await axios({
          method: 'get',
          url: '/bleats',
          params: {
            page: currentPage - 1,
            per_page: 10,
          },
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer ' + localStorage.getItem('bird-person-web.auth.token'),
          },
        });
        // console.log(currentPage);
        setTotalResults(response.data.total);
        setBleats(response.data.bleats);
      } catch (error) {
        console.log(error);
      }
    };
    f();
  }, [currentPage]);

  return (
    bleats &&
    bleats.map((bleat) => {
      return (
        <BleatCard
          bleat={bleat}
          key={bleat.id}
          setBleats={setBleats}
          isBleatView={false}
        />
      );
    })
  );
}
