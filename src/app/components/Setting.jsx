import React from "react";
import { IoClose } from "react-icons/io5";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { GiSpeakerOff } from "react-icons/gi";
const Setting = ({props}) => {
    const {setSpeaker,setOnSpeaker,onSpeaker} = props
  return (
    <div className="w-sm  bg-indigo-900 p-4 relative border-2 border-blue-400 rounded-xl flex justify-center flex-col items-center animate__animated animate__bounceIn">
      <span
        onClick={() => setSpeaker(true)}
        className="absolute -right-2 -top-3 bg-indigo-900 h-7 w-7 rounded-full border-2 border-blue-400 flex flex-col justify-center items-center"
      >
        <IoClose className="text-xl text-white cursor-pointer" />
      </span>
      <span className="pb-2 text-xl font-semibold text-white">Speaker</span>
      <span
        onClick={() => setOnSpeaker(!onSpeaker)}
        className="border-2 border-blue-400 px-5 py-2 rounded-sm cursor-pointer"
      >
        {!onSpeaker ? (
          <HiMiniSpeakerWave className="text-3xl text-white animate__animated animate__bounceIn" />
        ) : (
          <GiSpeakerOff className="text-3xl text-white animate__animated animate__bounceIn" />
        )}
      </span>
    </div>
  );
};

export default Setting;
