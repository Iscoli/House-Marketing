import {useState,useEffect} from 'react'
 // eslint-disable-next-line
import {Link, useNavigate, useParams} from 'react-router-dom'
import {getDoc, doc} from 'firebase/firestore'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/swiper.min.css';
// import required modules
import { Pagination} from "swiper";

import {getAuth} from 'firebase/auth'
import {db} from  '../firebase.config'
import Spinner from '../components/Spinner'
import shareIcon from '../assets/svg/shareIcon.svg'







function Listing() {
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [shareLinkCopied, setShareLinkCopied] = useState(false)
 // eslint-disable-next-line
  const navigate = useNavigate()
  const params = useParams()
  const auth = getAuth()

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, 'listings', params.listingId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setListing(docSnap.data())
        setLoading(false)
      }
    }

    fetchListing()
  }, [navigate, params.listingId])

    

  if (loading) {
    return <Spinner />
  }
 
  return (
    <main>
      {/* <Helmet>
        <title>{listing.name}</title>
      </Helmet> */}

    
   {/* <Swiper
        slidesPerView={1}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="swiper-container gallery-top"
      >
        
        {listing.imgUrls.map((image,index)=>{
         
         return ( <SwiperSlide
          className='swiper-wrapper'
         key={index}>
                   <img class="swiper-slide" src={listing.imgUrls[index]} alt="image" />
                   
              </SwiperSlide>)
       })}


      </Swiper> */}
    <Swiper
        slidesPerView={"auto"}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
       {listing.imgUrls.map((image,index)=>(
               <SwiperSlide
          className='swiperSlideDivs'
          key={index}>
          
           <img  src={listing.imgUrls[index]} alt="sliders" className='sliderImg'/>
           
              </SwiperSlide> 
        
       ))}
        
      </Swiper>
      
      <div
        className='shareIconDiv'
        onClick={() => {
          navigator.clipboard.writeText(window.location.href)
          setShareLinkCopied(true)
          setTimeout(() => {
            setShareLinkCopied(false)
          }, 2000)
        }}
      >
        <img src={shareIcon} alt='' />
      </div>

      {shareLinkCopied && <p className='linkCopied'>Link Copied!</p>}

      <div className='listingDetails'>
        <p className='listingName'>
          {listing.name} - $
          {listing.offer
            ? listing.discountedPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            : listing.regularPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                 {listing.type === 'rent' ? '/Month' : ''}
        </p>
        <p className='listingLocation'>{listing.location}</p>
        <p className='listingType'>
          For {listing.type === 'rent' ? 'Rent' : 'Sale'}
        </p>
        {listing.offer && (
          <p className='discountPrice'>
            ${listing.regularPrice - listing.discountedPrice} discount
          </p>
        )}

        <ul className='listingDetailsList'>
          
          <li>
            {listing.bedrooms > 1
              ? `${listing.bedrooms} Bedrooms`
              : '1 Bedroom'}
          </li>
          <li>
            {listing.bathrooms > 1
              ? `${listing.bathrooms} Bathrooms`
              : '1 Bathroom'}
          </li>
          <li>{listing.parking && 'Parking Spot'}</li>
          <li>{listing.furnished && 'Furnished'}</li>
        </ul>

       

        {auth.currentUser?.uid !== listing.useRef && (
          <Link
            to={`/contact/${listing.useRef}?listingName=${listing.name}`}
            className='primaryButton'
          >
            Contact Landlord
          </Link>
        )}
      </div>
    </main>
  )
}

export default Listing

// https://stackoverflow.com/questions/67552020/how-to-fix-error-failed-to-compile-node-modules-react-leaflet-core-esm-pat

      


   
//    {/* <div

//     style={{
//       backgroundImage: `url(${listing.imgUrls[index]})`,
//       backgroundPosition: 'center',
//       backgroundSize: 'cover',
//       backgroundRepeat: 'no-repeat',
//     }}
//     className='swiperSlideDiv swiper-slide'
// ></div> */}
// className='swiperimg'