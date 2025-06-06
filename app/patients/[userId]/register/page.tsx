import Link from "next/link";
import React from "react";
import Image from "next/image";
import RegisterForm from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";
//Change media for MedixhUb

const Register = async({params: {userId}}: SearchParamProps) => {
    const user = await getUser(userId);

    return (
        <div className="flex h-screen max-h-screen">
  
        <section className="remove-scrollbar container">
          
          <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
            <Image
              src="/assets/icons/logo-full.svg"
              height={1000}
              width={1000}
              alt="patient"
              className="mb-12 h-16 w-fit"
            />
  
            <RegisterForm user={user} />
  
            <p className="copywrite py-12">
                © 2025 MedixHub, built by <Link href="https://medixhub.com" className="text-green-500">KatlegoThatGuy</Link>
            </p>

          </div>
        </section>
  
        <Image
          src="/assets/images/register-img.png"
          height={1000}
          width={1000}
          alt="Patient"
          className="side-img max-w-[390px]"
          unoptimized
        />
        
      </div>
    );
    }

    export default Register;