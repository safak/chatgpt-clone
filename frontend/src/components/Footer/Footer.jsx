
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

function Footer() {
  return (
    <div className=" overflow-hidden py-8 bg-gray-400 ">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="-m-6 flex flex-wrap">
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mt-6 inline-flex items-center">
                <Logo width="100px" />
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  &copy; Copyright 2024. All Rights Reserved by from Watch to Work.
                </p>
              </div>
            </div>
          </div>

          {/* <div className="w-full mt-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-4 text-xs font-semibold uppercase text-gray-500">
                Company
              </h3>
              <ul>
                <li className="mb-2">
                  <Link className="text-base font-medium text-gray-900 hover:text-gray-700" to="/">
                    Features
                  </Link>
                </li>
                <li className="mb-2">
                  <Link className="text-base font-medium text-gray-900 hover:text-gray-700" to="/">
                    Pricing
                  </Link>
                </li>
                
              </ul>
            </div>
          </div> */}

          <div className="w-full mt-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-4 text-xs font-semibold uppercase text-gray-500">
                Support
              </h3>
              <ul>
                <li className="mb-2">
                  <Link className="text-base font-medium text-gray-900 hover:text-gray-700" to="/">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link className="text-base font-medium text-gray-900 hover:text-gray-700" to="/">
                    Customer Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="w-full mt-6 md:w-1/2 lg:w-3/12">
            <div className="h-full">
              <h3 className="tracking-px mb-4 text-xs font-semibold uppercase text-gray-500">
                Legals
              </h3>
              <ul>
                <li className="mb-2">
                  <Link className="text-base font-medium text-gray-900 hover:text-gray-700" to="/">
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li className="mb-2">
                  <Link className="text-base font-medium text-gray-900 hover:text-gray-700" to="/">
                    Privacy Policy
                  </Link>
                </li>
                
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;








