import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import axios from '../utils/axios'
import getHumanReadableDate from '../utils/utils'
import BleatCard from '../bleat/BleatCard'

export default function Bleat() {
  const { id } = useParams()
  const [bleat, setBleat] = useState({})
  const [bleatReplies, setBleatReplies] = useState([])

  useEffect(() => {
    window.scrollTo(0, 0)
    const f = async () => {
      try {
        const bleatRes = await axios({
          method: 'get',
          url: '/bleats/' + id,
          headers: {
            'Content-Type': 'application/json',
            Authorization:
            'Bearer ' + localStorage.getItem('bird-person-web.auth.token'),
          }
        });
        const bleatReplies = await axios({
          method: 'get',
          url: '/bleats/' + id + '/reply',
          headers: {
            'Content-Type': 'application/json',
            Authorization:
            'Bearer ' + localStorage.getItem('bird-person-web.auth.token'),
          }
        });
        setBleat(bleatRes.data);
        setBleatReplies(bleatReplies.data)
      } catch (error) {
        console.log(error)
      }
    }
    f()
  }, [id]);
  
    return bleat && bleatReplies &&(
    <div className="grow  min-h-screen bg-gray-50 dark:bg-black">
      <BleatCard bleat={bleat} key = {bleat.id} setBleats={setBleatReplies} isBleatView={true}/>
      <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"/>
      <div>
      {bleatReplies.map(reply => <BleatCard  bleat = {reply} key = {reply.id} setBleats={setBleatReplies} />)}
      </div>
    </div>
  )
}
