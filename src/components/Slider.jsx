  import {useState, useEffect} from 'react'
  import { useNavigate } from 'react-router-dom'
  
  import {collection,query,orderBy,limit, getDocs} from 'firebase/firestore'
  import {db} from '../firebase.config'
  // Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/swiper.min.css';
// import required modules
import { Pagination } from "swiper";










  function Slider(){
    
    const [listings, setListings]= useState(null)

    const navigate = useNavigate()

    useEffect(() => {
      const fetchListings = async () => {
        const listingsRef = collection(db, 'listings')
        const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(5))
        const querySnap = await getDocs(q)
  
        let listings = []
  
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          })
        })
  
        setListings(listings)
     
      }
  
      fetchListings()
    }, [])

   

     


    



    return (
      
      listings && (
        <>
        <p className='exploreHeading'>Recommended</p>

        <Swiper
        slidesPerView={"1"}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        
        {listings.map(({data,id})=>{
          
           return   <SwiperSlide
           className='swiper-wrapper' key={id}>
            <div  key={id}
            onClick={()=>navigate(`/category/${data.type}/${id}`)}
            className='swiperSlideDivs'> 
          <img src={data.imgUrls[0]}  alt='swipers' className='homeImg' />
          <p className='swiperSlideText'>{data.name}</p>
                <p className='swiperSlidePrice'>
                  ${data.discountedPrice ?? data.regularPrice}{' '}
                  {data.type === 'rent' && '/ month'}
                </p>
            </div>
                  </SwiperSlide>
          })}
        
      </Swiper>
      </>
      )
    )

  }
    export default Slider





