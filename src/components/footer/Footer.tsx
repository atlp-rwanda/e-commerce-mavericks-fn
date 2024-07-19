import FooterTitle from '../../containers/footer/FooterTitle';
import SocialIcon from '../../containers/footer/SocialIcon';
import FooterLink from '../../containers/footer/FooterLink';
import Chat from '../chat/Chat';
function Footer() {
  return (
    <>
      <div className='w-full flex flex-col gap-2 bg-grayColor font-roboto 2xl:items-center '>
        <Chat />
        <div className='p-3 md:p-4 xl:px-10 2xl:w-[1440px] grid grid-cols-2 md:grid-cols-5 xl:grid-cols-6 gap-x-20 gap-y-5 sm:gap-5 md:gap-2'>
          <div className='flex flex-col md:row-span-1 md:col-start-1 md:col-end-3 gap-3'>
            <FooterTitle title={'mavericks'} />
            <div className='leading-none text-xs md:text-base break-words flex flex-col gap-3 font-light flex-grow'>
              <p>K309 St , Makuza plaza, Nyarugenge , Kigali, Rwanda</p>
              <p>andela.mavericks@gmail.com</p>
              <p>+250 788 888 888</p>
            </div>
            <div className='flex gap-2'>
              <a href='#' target='_blank'>
                <SocialIcon name='instagram' />
              </a>
              <a href='#' target='_blank'>
                <SocialIcon name='facebook' />
              </a>
              <a href='#' target='_blank'>
                <SocialIcon name='twitter' />
              </a>
            </div>
          </div>
          <div className='flex flex-col gap-3'>
            <FooterTitle title={'company'} />
            <div className='flex flex-col gap-1 font-light'>
              <FooterLink name={'about us'} />
              <FooterLink name={'contact us'} />
            </div>
          </div>
          <div className='flex flex-col gap-3'>
            <FooterTitle title={'shop'} />
            <div className='flex flex-col gap-1 font-light'>
              <FooterLink name={'new arrival'} />
              <FooterLink name={'all products'} />
              <FooterLink name={'babies'} />
              <FooterLink name={'father'} />
              <FooterLink name={'electronics'} />
            </div>
          </div>
          <div className='flex flex-col gap-3'>
            <FooterTitle title={'help'} />
            <div className='flex flex-col gap-2 md:gap-1 font-light'>
              <FooterLink name={'customer services'} />
              <FooterLink name={'my account'} />
              <FooterLink name={'find store'} />
              <FooterLink name={'legal & privacy'} />
            </div>
          </div>
          <div className='flex flex-col items-center gap-3 row-span-1 md:row-span-1 col-span-2 md:col-start-3 md:col-end-6 lg:col-start-4 xl:col-start-6 xl:auto-cols-max'>
            <FooterTitle title={'subscribe'} />
            <p className='hidden xl:flex leading-none text-base font-light'>
              Be the first to get latest news about trends,Promotions and many more.
            </p>
            <form className='w-full flex flex-col'>
              <div className=' w-full flex'>
                <label htmlFor='email'></label>
                <input type='text' id='email' placeholder='Email address' className='p-2 flex-grow xl:w-3/4' />
                <button type='submit' className='leading-none bg-greenColor text-whiteColor w-20'>
                  Join
                </button>
              </div>
              {/* <span className='text-xs text-redColor text-left'>Email is not valid</span> */}
            </form>
          </div>
        </div>
        <p className='p-3 md:p-4 xl:px-10 2xl:w-[1440px] text-xs text-center xl:text-left '>
          &copy; {new Date().getFullYear()} Mavericks Shop. All rights reserved.
        </p>
      </div>
    </>
  );
}

export default Footer;
