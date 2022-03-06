const  changeTimeFormat = (timestamp) => {
  const dateChange = timestamp.toDate().toString().split('GMT')[0];
  const dateUS = dateChange.slice(4, -1)
  const dateToES = dateUS.split(' ');
  const dateES = `${dateToES[1]}/${dateToES[0]}/${dateToES[2]}-${dateToES[3]}`
 return dateES;
}

export { changeTimeFormat }