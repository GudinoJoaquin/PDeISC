import { Dimensions, Text, View, StyleSheet } from 'react-native';

interface ClassCardProps {
  titulo: string;
  descripcion: string;
  topics: string[];
  destacada?: boolean;
}

export default function ClassCard({
  titulo,
  descripcion,
  topics,
  destacada = false,
}: ClassCardProps) {
  const screenWidth = Dimensions.get('window').width;
  const cardWidth = screenWidth * 0.9; // 👈 cada card ocupa el 80% del ancho
  return (
    <View
      style={[
        { width: cardWidth, minHeight: 160, marginVertical: 8 },
        styles.card,
        destacada && styles.cardDestacada,
      ]}>
      {destacada && (
        <View style={styles.ribbon}>
          <Text style={styles.ribbonText}>★ Destacada</Text>
        </View>
      )}
      <View style={[styles.header, destacada && styles.headerDestacada]} />
      <View style={styles.body}>
        <Text style={styles.titulo}>{titulo}</Text>
        {descripcion && <Text style={styles.descripcion}>{descripcion}</Text>}
        <View style={styles.topicsRow}>
          {topics.map((t, i) => (
            <Text key={i} style={styles.topicChip}>
              {t}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.13,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
    position: 'relative',
  },
  cardDestacada: {
    borderWidth: 2,
    borderColor: '#ffb300',
    backgroundColor: '#fffde7',
  },
  header: {
    height: 38,
    width: '100%',
    backgroundColor: '#1976d2',
  },
  headerDestacada: {
    backgroundColor: '#ffb300',
  },
  body: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    minHeight: 90,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
  },
  descripcion: {
    color: '#444',
    fontSize: 14,
    marginBottom: 8,
    marginTop: 2,
  },
  topicsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  topicChip: {
    backgroundColor: '#e3f2fd',
    color: '#1976d2',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    fontSize: 13,
    marginRight: 6,
    marginBottom: 4,
  },
  ribbon: {
    position: 'absolute',
    top: 8,
    right: -18,
    backgroundColor: '#ffb300',
    paddingHorizontal: 18,
    paddingVertical: 2,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    zIndex: 2,
    elevation: 2,
  },
  ribbonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
    letterSpacing: 0.5,
  },
});
