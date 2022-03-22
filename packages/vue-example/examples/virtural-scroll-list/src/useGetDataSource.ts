import { ref, onMounted } from "vue";

export default function useGetDataSource() {
  const dataSource = ref<
    {
      id: number;
      name: string;
    }[]
  >([]);
  onMounted(() => {
    dataSource.value = Array.from({ length: 100000 }).map((item, index) => ({
      id: index,
      name: `第${index + 1}条数据`,
    }));
  });

  return {
    dataSource,
  };
}
