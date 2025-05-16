const Alert = (props) => {
  return (
    <div className={`flex justify-center items-center bg-green-300 p-4 w-full h-[6vh] text-white fixed font-medium text-2xl ${props.display? 'z-10' : '-z-10'}`}>
        {props.message} 
    </div>
  )
}

export default Alert
