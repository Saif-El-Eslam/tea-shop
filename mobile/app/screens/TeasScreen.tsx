import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { DotIndicator } from "react-native-indicators";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { LoginScreenNavigationProp } from "app/types/navigation";
import { useAppContext } from "app/context/AppContext";
import {
  setLoading,
  setProducts,
  addProduct,
  addCart,
} from "app/context/AppActions";
import { getTeas, deleteTea } from "app/services/TeasService";
import TeaCard from "app/components/TeaCard";
import CreateUpdateTeaComponent from "app/components/CreateUpdateTea";
import Notify from "app/utils/Notify";
import { TeaType } from "app/types/types";
import colors from "app/utils/colors";

const CreateLogo = require("app/assets/create-white.png");

const TeasScreen: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const [createUpdateOpen, setCreateUpdateOpen] = useState(false);
  const [selectedTea, setSelectedTea] = useState<TeaType | null>(null);

  const handleGetTeas = async () => {
    dispatch(setLoading(true));
    try {
      const teas = await getTeas();
      await AsyncStorage.setItem("teas", JSON.stringify(teas));
      dispatch(setProducts(teas));
    } catch (err: any) {
      err?.errors ? Notify.error(err.errors[0].msg) : Notify.error(err.error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleBuy = async (id: string, price: number) => {
    dispatch(
      addCart({
        productId: id,
        price_per_unit: price,
      })
    );
    Notify.success("Tea added to cart!");
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTea(id);
      dispatch(setProducts(state.teas.filter((tea) => tea.id !== id)));
      await AsyncStorage.setItem("teas", JSON.stringify(state.teas));
      Notify.success("Tea deleted successfully!");
    } catch (err: any) {
      err?.errors ? Notify.error(err.errors[0].msg) : Notify.error(err.error);
    }
  };

  const handleUpdate = (tea: TeaType) => {
    setSelectedTea(tea);
    setCreateUpdateOpen(true);
  };

  const handleCreate = () => {
    setSelectedTea(null);
    setCreateUpdateOpen(true);
  };

  const handleClosePopup = () => {
    setCreateUpdateOpen(false);
    setSelectedTea(null);
  };

  const onSuccessfulCreateUpdate = async (tea: TeaType) => {
    const teaForDispatch = { ...tea };
    if (state.teas.some((t) => t.id === tea.id)) {
      dispatch(
        setProducts(
          state.teas.map((t) => (t.id === tea.id ? teaForDispatch : t))
        )
      );
    } else {
      dispatch(addProduct(teaForDispatch));
    }
    await AsyncStorage.setItem("teas", JSON.stringify(state.teas));
    setCreateUpdateOpen(false);
    setSelectedTea(null);
  };

  useEffect(() => {
    if (state.teas.length === 0) handleGetTeas();
  }, []);

  return (
    <View style={styles.container}>
      {state.user?.role === "admin" && (
        <View style={styles.createButtonContainer}>
          <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
            <Image source={CreateLogo} style={styles.createLogo} />
            <Text style={styles.createButtonText}>Create New Tea</Text>
          </TouchableOpacity>
        </View>
      )}

      {state.loading ? (
        <DotIndicator
          count={3}
          size={12}
          color={colors.yellow}
          // style={styles.indecator}
        />
      ) : (
        <FlatList
          style={styles.teasContainer}
          data={state.teas}
          renderItem={({ item }) => (
            <TeaCard
              name={item.name}
              description={item.description}
              pricePerUnit={item.price_per_unit}
              quantityLeft={item.quantity}
              isAdmin={state.user?.role === "admin"}
              onBuy={() => {
                handleBuy(item.id, item.price_per_unit);
              }}
              onUpdate={() => handleUpdate(item)}
              onDelete={() => handleDelete(item.id)}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}

      {createUpdateOpen && (
        <CreateUpdateTeaComponent
          tea={selectedTea}
          onSuccess={onSuccessfulCreateUpdate}
          onClose={handleClosePopup}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    backgroundColor: colors.brown,
    paddingHorizontal: 20,
  },
  touchableHighlight: {},
  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  createButtonContainer: {
    backgroundColor: colors.lightBeige,
    alignItems: "center",
    paddingVertical: 20,
    margin: "auto",
    width: "80%",
  },
  createButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.darkGreen,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  createLogo: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  createButtonText: {
    color: "white",
    fontSize: 16,
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  teasContainer: {
    flex: 1,
    paddingVertical: 40,
  },
});

export default TeasScreen;
