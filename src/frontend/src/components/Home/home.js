import React from 'react';
import {useNavigate} from "react-router-dom";


const Home = (props) => {





    return (
        <div className="relative bg-white overflow-hidden">
      <div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:static">
          <div className="sm:max-w-lg">
            <h1 className="text-4xl font font-extrabold tracking-tight text-gray-900 sm:text-6xl">
            Your mental health is important
            </h1>
            <p className="mt-4 text-xl text-gray-500">
            Place where you can post and get feedback related to your mental health. To make sure that your take your medication on time. Also keep track of your mood history.
            </p>
          </div>
          <div>
            <div className="mt-10">
              {/* Decorative image grid */}
              <div
                aria-hidden="true"
                className="pointer-events-none lg:absolute lg:inset-y-0 lg:max-w-7xl lg:mx-auto lg:w-full"
              >
                <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="w-44 h-64 rounded-lg overflow-hidden sm:opacity-0 lg:opacity-100">
                        <img
                          src="https://firstaidforlife.org.uk/wp-content/uploads/2018/03/poisoning-pill-bottle.jpg"
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                      <div className="w-44 h-64 rounded-lg overflow-hidden">
                        <img
                          src="https://cdn-blog.credihealth.com/wp-content/uploads/2020/02/asian-woman-is-suffering-from-depression_74216-44.jpg"
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="w-44 h-64 rounded-lg overflow-hidden">
                        <img
                          src="https://lmimirror3pvr.azureedge.net/static/media/6309/1f946f39-b36c-4752-bfd8-537388144255/good-cry-960x540.jpg"
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                      <div className="w-44 h-64 rounded-lg overflow-hidden">
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Scared_Child_at_Nighttime.jpg/1200px-Scared_Child_at_Nighttime.jpg"
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                      <div className="w-44 h-64 rounded-lg overflow-hidden">
                        <img
                          src="https://www.goodtherapy.org/dbimages/ckupload_20190109170003_fear_A1.jpg"
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="w-44 h-64 rounded-lg overflow-hidden">
                        <img
                          src="https://miro.medium.com/max/1200/1*XDikfP-V-gIfhcofkdGc9g.jpeg"
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                      <div className="w-44 h-64 rounded-lg overflow-hidden">
                        <img
                          src="https://www.dubinlawoffice.com/wp-content/uploads/sites/1402079/2015/10/Tears.jpg"
                          alt=""
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href="/login"
                className="inline-block text-center bg-indigo-600 border border-transparent rounded-md py-3 px-8 font-medium text-white hover:bg-indigo-700 "
              >
                Login
              </a>
             
            </div>
          </div>
        </div>
      </div>
    </div>
        
    );
}

export default Home;





