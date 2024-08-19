// import {DrawerContentComponentProps, DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator} from "@react-navigation/drawer";
// import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

// type CustomDrawerItemProps= {
//     label: string;
//     //means expect a function w no arguments n no return value
//     onPress: () => void;
//     isActive: boolean;
// };


// const CustomDrawerItem: React.FC<CustomDrawerItemProps> = ({label, onPress, isActive}) => {
//     return (
//         <TouchableOpacity onPress={onPress} style={[styles.item, isActive && styles.activeItem]}>
//                 <Text style={[styles.itemText, isActive && styles.activeItemText]}>{label}</Text>
//         </TouchableOpacity>
//     );
// }

// const styles = StyleSheet.create({
//     item:{
//         padding:15,
//     },
//     activeItem: {
//         backgroundColor: '#8A2BE2',
//     },
//     itemText: {
//         color: '#000',
//     },
//     activeItemText: {
//         color: '#8A2BE2',
//     },
// });

// export default CustomDrawerItem;