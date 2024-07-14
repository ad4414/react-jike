
 import Map from '../BarChart/index'
const Home = () => {
    
  const dataList=[{"name":"北京","value":2000},{"name":"福建","value":4000},{"name":"河南","value":"2500"}]
    return (
        <div>
    {/*   <BarChart title={'三大框架满意度'} />
      <BarChart title={'三大框架使用度'} /> */}
      
<Map data={dataList}></Map>
     

       
    </div>
    )
  }
  
  export default Home