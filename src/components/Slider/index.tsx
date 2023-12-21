import React, {useState} from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {COLORS} from '../../asset/color/color';

const windowWidth = Dimensions.get('window').width;

const SliderComponent: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const images = [
    {id: '1', uri: require('../../asset/image/curioquest_logo.png')},
    {id: '2', uri: require('../../asset/image/mystery.png')},
    {id: '3', uri: require('../../asset/image/adventure.png')},
  ];

  const renderItem = ({item}: {item: {id: string; uri: any}}) => {
    return (
      <View style={styles.slide}>
        <Image source={item.uri} style={styles.image} resizeMode="cover" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        data={images}
        renderItem={renderItem}
        sliderWidth={windowWidth}
        itemWidth={windowWidth}
        layout="default"
      />
      <Pagination
        dotsLength={images.length}
        activeDotIndex={activeSlide}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.paginationDot}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
  },
  slide: {
    width: '100%',
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  paginationContainer: {
    paddingTop: 10,
    position: 'absolute',
    top: 190,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8,
    backgroundColor: COLORS.white,
  },
});

export default SliderComponent;
