import { Link } from 'react-router-dom';

// Authentication layout components
import BasicLayout from 'layouts/authentication/components/BasicLayout';
import './landing-page-style.css';
import svgImage from './../../assets/images/bg-landing-page-layered-waves-haikei.svg'

function LandingPage() {
  return (
    <BasicLayout>
      {/* Gradient Background */}

      {/* <div className="absolute inset-0 bg-gradient-to-b from-blue-600 to-blue-300 z-[-1]" /> */}

      {/* <div className="flex ">
      </div> */}

      <div className="flex items-center justify-center min-h-screen">
        {/* Card with Text */}
        <div className="p-12 text-center w-auto mx-auto">
          <div className="flex flex-col items-center text-center whitespace-nowrap">
            {/* Title */}
            <div className="mb-4 font-bold text-4xl text-white">
              Create and Record Audits in a Few Simple Steps !
            </div>

            {/* Subtitle */}
            <div className="mb-6 text-lg text-white">
              ProcedurePulse is a user-owned process standardization tool and sharing <br></br> website that allows you to create and distribute standard  methods, <br></br> with responses available and accessible to you.
            </div>

            {/* Sign Up Button */}
            <button className="bg-blue-600 text-white py-2 px-4 font-semibold rounded-md whitespace-nowrap mr-2 z-10">
              Get Started !
            </button>
          </div>
        </div>
      </div>
      <div className="flex min-h-screen">
        <img src={svgImage} alt="SVG" />
      </div>
    </BasicLayout>
  );
}

export default LandingPage;
