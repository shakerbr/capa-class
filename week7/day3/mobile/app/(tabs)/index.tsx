import { Text, View, ScrollView } from "react-native";

export default function Index() {
  const sections = [
    {
      title: "Available Books",
      description: "Ready to borrow today",
      titleColor: "text-emerald-700",
      badgeClass: "bg-emerald-100 text-emerald-700",
      books: [
        {"title": "The Great Gatsby", "author": "F. Scott Fitzgerald"},
        {"title": "To Kill a Mockingbird", "author": "Harper Lee"},
        {"title": "1984", "author": "George Orwell"},
        {"title": "Pride and Prejudice", "author": "Jane Austen"},
        {"title": "The Catcher in the Rye", "author": "J.D. Salinger"},
        {"title": "The Hobbit", "author": "J.R.R. Tolkein"},
        {"title": "Fahrenheit 451", "author": "Ray Bradbury"}
      ]
    },
    {
      title: "Coming Soon",
      description: "New arrivals this month",
      titleColor: "text-amber-700",
      badgeClass: "bg-amber-100 text-amber-700",
      books: [
        {"title": "The Lord of the Rings", "author": "J.R.R. Tolkein"},
        {"title": "Harry Potter and the Sorcerer's Stone", "author": "J.K. Rowling"},
        {"title": "The Chronicles of Narnia", "author": "C.S. Lewis"},
        {"title": "The Hunger Games", "author": "Suzanne Collins"},
        {"title": "The Da Vinci Code", "author": "Dan Brown"},
        {"title": "The Secret Garden", "author": "Frances Hodgson Burnett"},
        {"title": "The Alchemist", "author": "Paulo Coelho"}
      ]
    },
    {
      title: "Borrowed Books",
      description: "Currently checked out",
      titleColor: "text-sky-700",
      badgeClass: "bg-sky-100 text-sky-700",
      books: [
        {"title": "The Great Gatsby", "author": "F. Scott Fitzgerald"},
        {"title": "To Kill a Mockingbird", "author": "Harper Lee"},
        {"title": "1984", "author": "George Orwell"},
        {"title": "Pride and Prejudice", "author": "Jane Austen"},
        {"title": "The Catcher in the Rye", "author": "J.D. Salinger"},
        {"title": "The Hobbit", "author": "J.R.R. Tolkein"},
        {"title": "Fahrenheit 451", "author": "Ray Bradbury"},
        {"title": "The Lord of the Rings", "author": "J.R.R. Tolkein"},
        {"title": "Harry Potter and the Sorcerer's Stone", "author": "J.K. Rowling"},
        {"title": "The Chronicles of Narnia", "author": "C.S. Lewis"},
        {"title": "The Hunger Games", "author": "Suzanne Collins"},
        {"title": "The Da Vinci Code", "author": "Dan Brown"},
        {"title": "The Secret Garden", "author": "Frances Hodgson Burnett"},
        {"title": "The Alchemist", "author": "Paulo Coelho"}
      ]
    }
  ];

  return (
    <View className="flex-1 bg-slate-100">
      <ScrollView contentContainerClassName="px-5 pb-8 pt-14">
        <View className="mb-6 rounded-3xl bg-white p-5 shadow-sm">
          <Text className="text-xs font-semibold uppercase tracking-widest text-slate-500 text-center">
            Library Dashboard
          </Text>
          <Text className="mt-2 text-3xl font-extrabold text-slate-900 text-center">
            Your Bookshelf
          </Text>
          <Text className="mt-2 text-base text-slate-600 text-center">
            Browse available books, upcoming titles, and your current borrows.
          </Text>
        </View>

        {sections.map((section) => (
          <View key={section.title} className="mb-4 rounded-2xl bg-white p-5 shadow-sm">
            <View className="mb-3 flex-row items-center justify-between">
              <View>
                <Text className={`text-xl font-bold ${section.titleColor}`}>
                  {section.title}
                </Text>
                <Text className="mt-1 text-sm text-slate-500">{section.description}</Text>
              </View>
              <Text className={`rounded-full px-3 py-1 text-xs font-semibold ${section.badgeClass}`}>
                {section.books.length}
              </Text>
            </View>

            <View className="gap-2">
              {section.books.map((book, index) => (
                <View
                  key={`${section.title}-${book.title}`}
                  className="flex-row items-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-2"
                >
                  <Text className="mr-3 w-6 text-sm font-bold text-slate-500">
                    {index + 1}.
                  </Text>
                  <Text className="flex-1 text-base text-slate-800">{book.title}</Text>
                  <Text className="text-sm text-slate-500">{book.author}</Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
