import React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useSelector, useDispatch } from 'react-redux'
import { setBreed, setSummary } from '../reducer/BreedReducer'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const DogCard = ({dog}) => {
  const dispatch = useDispatch()
  const breed = useSelector((state) => state.breed.data)
  const summary = useSelector((state) => state.breed.summary)

  const like =  (dog) => {
    const o = breed.map(d => {
      if(d.id === dog.id){
        d = {
          ...d,
          liked: d.liked + 1
        }

        let summaryx = JSON.parse(JSON.stringify(summary))
        let exist = summaryx.findIndex(find => find.id === dog.id)
        let found = breed.filter(element => element.name === dog.name).length
        console.log("found",found)
        if(exist>=0) {
          summaryx[exist].liked = summaryx[exist].liked+1
        }else{
          summaryx.push({
            id: d.id,
            name: d.name,
            img: d.img,
            count: found,
            liked: d.liked
          })
        }
        
        dispatch(setSummary(summaryx))
      } 
      return d
    });
    
    dispatch(setBreed(o))
  }

  return <Grid item xs={3}>
    <Item >
      <img onClick={() => like(dog)} src={dog?.img} style={{width:"100%", height:"100%"}} alt={'dog'}/> <br/>
      {dog?.name} <br/>
      Like: {dog?.liked}
    </Item>
  </Grid>
}
export default DogCard;