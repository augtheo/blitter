import axios from '../utils/axios'
import BleatCard from './BleatCard'
import { useEffect} from 'react'

export default function BleatList({ bleats, setBleats }) {
  useEffect(() => {
    const f = async () => {
      try {
        const response = await axios({
          method: 'get',
          url: '/bleats',
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer ' + localStorage.getItem('bird-person-web.auth.token'),
          },
        })
        setBleats(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    f()
  }, [])

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
      )
    })
  )
}
