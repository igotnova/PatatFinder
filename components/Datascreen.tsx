
// import React from 'react';
// import { FlatList, ActivityIndicator, Text, View } from 'react-native';

// export default class FetchExample extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { isLoading: true };
//   }

//   componentDidMount() {
//     return fetch('https://stud.hosted.hr.nl/0969850/html/api/locations.json')
//       .then(response => response.json())
//       .then(responseJson => {
//         this.setState(
//           {
//             isLoading: false,
//             dataSource: responseJson.movies,
//           },
//           function() {}
//         );
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   }

//   render() {
//     return (
//       ....
//     );
//   }
// }