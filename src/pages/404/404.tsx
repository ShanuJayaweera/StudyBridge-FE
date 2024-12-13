
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';

const Page404 = () => {

  const navigate = useNavigate();

  return (
    <>
      <motion.section
        // initial={{ opacity: 0, y: -5 }}
        // animate={{
        //   opacity: 1,
        //   y: 0,
        //   transition: {
        //     duration: 0.5, // Adjust the duration here (1 second in this example)
        //     // delay: 0.4 * 0.5 * 0.1
        //   },
        // }}
        // exit={{ opacity: 0, y: -5 }}
        className=" relative z-10 py-[100px] h-full"
      >
        <div className="container mx-auto">
          <div className="flex -mx-4">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[400px] text-center flex flex-col items-center">
                <h2 className="mb-2 font-bold leading-none text-light text-8xl md:text-9xl">404</h2>
                <h4 className="mb-3 md:text-2xl text-xl font-semibold leading-tight text-light">Not found</h4>
                <p className="mb-8 text-lg text-light">text 2</p>

                <Button
                  // to={`/`}
                  onClick={() => navigate('/')}
                  view={'ghoust'}
                  className={`flex justify-center items-center lg:text-base lg:h-auto font-medium gap-0 py-2 top-[140px] tracking-[0.025em] no-underline shadow-md max-sm:py-1 lg:px-5 hover:shadow-hoverShadow bg-gray-100 text-primary1 border border-solid border-primary1 rounded hover:no-underline visited:text-purple-700 right-2 md:text-[13px] max-lg:px-4 w-1/2`}
                  // apparence='gray'
                >
home                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 flex items-center justify-between w-full h-full space-x-5 -z-10 md:space-x-8 lg:space-x-14">
          <div className="h-full w-1/3 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]" />
          <div className="flex w-1/3 h-full">
            <div className="h-full w-1/2 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]" />
            <div className="h-full w-1/2 bg-gradient-to-t from-[#FFFFFF14] to-[#C4C4C400]" />
          </div>
          <div className="h-full w-1/3 bg-gradient-to-b from-[#FFFFFF14] to-[#C4C4C400]" />
        </div>
      </motion.section>
    </>
  );
}

export default Page404
