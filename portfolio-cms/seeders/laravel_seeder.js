const mongoose = require('mongoose');

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio_cms';

async function seed() {
  await mongoose.connect(uri);

  const SeriesSchema = new mongoose.Schema({
    name: { type: Object, default: { en: '', bn: '' } },
    slug: String,
    description: { type: Object, default: { en: '', bn: '' } },
    cover_image: String,
    is_published: Boolean
  }, { strict: false });

  const BlogSchema = new mongoose.Schema({
    title: { type: Object, default: { en: '', bn: '' } },
    slug: String,
    content: String,
    excerpt: String,
    language: String,
    series_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Series' },
    series_order: Number,
    tags: [String],
    is_published: Boolean,
    published_at: Date,
    read_time: Number
  }, { strict: false });

  const Series = mongoose.models.Series || mongoose.model('Series', SeriesSchema);
  const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema);

  console.log('Upserting Laravel Series...');
  
  const seriesData = {
    name: { en: 'Laravel Tricky Questions', bn: 'লারাভেল ট্রিকি প্রশ্নাবলী' },
    slug: 'laravel-tricky-questions',
    description: { 
      en: 'A deep dive into advanced and tricky Laravel interview questions with detailed, practical answers.', 
      bn: 'লারাভেলের অ্যাডভান্সড এবং ট্রিকি ইন্টারভিউ প্রশ্ন ও বিস্তারিত উত্তর নিয়ে একটি সিরিজ।' 
    },
    is_published: true
  };

  await Series.updateOne(
    { slug: seriesData.slug },
    { $set: seriesData },
    { upsert: true }
  );

  const seriesDoc = await Series.findOne({ slug: seriesData.slug });
  const seriesId = seriesDoc._id;

  const blogs = [
    {
      title: { en: '1. Active Record vs Data Mapper in Laravel', bn: '' },
      slug: 'active-record-vs-data-mapper-laravel',
      excerpt: 'Why does Eloquent use the Active Record pattern, and what are the trade-offs compared to Doctrine/Data Mapper?',
      content: `### Question:
Why does Eloquent use the Active Record pattern, and how does it differ from the Data Mapper pattern (like Doctrine)? In what scenarios would one fail over the other?

### Answer:
Eloquent uses the **Active Record** pattern. In this pattern, the Model is directly tied to the database table. Methods like \`save()\`, \`delete()\`, and \`find()\` live right on the Model. It is extremely intuitive and developer-friendly, making RAD (Rapid Application Development) effortless.

**Data Mapper**, on the other hand, keeps the domain Model completely detached from the database logic. An \`EntityManager\` is responsible for bridging the two. 

**Trade-offs & Tricks:**
1. **Testing:** Active Record can be notoriously hard to test without touching the database because the DB operations are tightly coupled to the model. You must use DB transactions or mock the Model intensely. Data Mapper makes unit testing pure and simple since domain objects are just plain PHP objects (POPOs).
2. **SRP (Single Responsibility Principle):** Eloquent breaks SRP. A single class knows its business rules AND how to persist itself. Data Mapper adheres heavily to SRP.
3. **Performance:** In massive enterprise applications where domains are highly decoupled, Data Mappers shine. But for 90% of web apps, Active Record allows you to ship faster and read the code much easier.`,
      tags: ['laravel', 'architecture', 'eloquent'],
      series_order: 1
    },
    {
      title: { en: '2. The N+1 Problem and Lazy vs Eager Loading', bn: '' },
      slug: 'n-plus-1-problem-lazy-eager-laravel',
      excerpt: 'How to detect and fix the N+1 problem in Laravel Eloquent effectively.',
      content: `### Question:
Your Laravel application is making 101 queries to fetch a list of 100 users and their profile pictures. Explain what went wrong and how to fix it without using raw SQL.

### Answer:
This is the classic **N+1 Problem**. It happens when you fetch N records from a database (1 query) and then access a relationship on each of those records within a loop (N more queries).

**The Wrong Way (Lazy Loading):**
\`\`\`php
$users = User::all(); // 1 query
foreach ($users as $user) {
    echo $user->profile->image_url; // 100 queries
}
\`\`\`

**The Fix (Eager Loading):**
You must instruct Eloquent to pre-load the relationship using \`with()\`.
\`\`\`php
$users = User::with('profile')->get(); // 2 queries total
foreach ($users as $user) {
    echo $user->profile->image_url; // 0 additional queries
}
\`\`\`

**Pro Trick:**
To strictly prevent this from ever happening in production, you can add this to your \`AppServiceProvider::boot()\` method:
\`\`\`php
Model::preventLazyLoading(! app()->isProduction());
\`\`\`
This will throw an exception in local/dev environments if lazy loading is attempted, forcing developers to use eager loading upfront!`,
      tags: ['laravel', 'eloquent', 'performance'],
      series_order: 2
    },
    {
      title: { en: '3. Dependency Injection vs Facades', bn: '' },
      slug: 'dependency-injection-vs-facades-laravel',
      excerpt: 'When should you use Facades instead of Dependency Injection, and how are Facades actually resolved in Laravel?',
      content: `### Question:
Laravel relies heavily on Facades (e.g., \`Cache::get()\`, \`DB::table()\`). How do they work under the hood? Are they anti-patterns compared to Dependency Injection (DI)?

### Answer:
A Facade in Laravel is NOT the classic gang-of-four Facade pattern. It is actually a **Static Proxy** to an underlying instance bound in the Service Container.

**How it works under the hood:**
When you call \`Cache::get()\`, PHP triggers the \`__callStatic()\` magic method on the \`Cache\` facade base class. It looks for the registered accessor (e.g., \`'cache'\`), grabs the active instance from the container (\`app('cache')\`), and dynamically calls \`->get()\` on that instance.

**DI vs Facades:**
1. **Testability:** Normally static methods are a nightmare to test. But Laravel Facades use Mockery under the hood to let you test them easily: \`Cache::shouldReceive('get')->once();\`.
2. **Consistency:** DI explicitly shows what dependencies a class requires in its constructor. Facades hide dependencies. 
3. **When to use what:** Use Facades for global helpers or quick scripts. For complex core Domain logic or Action classes, strictly use Constructor DI to reveal exact dependencies and make tests independent of Laravel's container lifecycle.`,
      tags: ['laravel', 'architecture', 'facades'],
      series_order: 3
    }
  ];

  console.log('Upserting Blogs...');
  for (const b of blogs) {
    b.language = 'en';
    b.series_id = seriesId;
    b.is_published = true;
    b.published_at = new Date();
    b.read_time = 3;
    
    await Blog.updateOne(
      { slug: b.slug },
      { $set: b },
      { upsert: true }
    );
  }

  // Update exactly the articles array inside the series if needed, but usually we just query by series_id.
  // Wait, the Series Schema actually has an 'articles' array of { blog_id, order }. Let's update it.
  const allSeriesBlogs = await Blog.find({ series_id: seriesId }).sort({ series_order: 1 });
  const articlesArray = allSeriesBlogs.map(b => ({ blog_id: b._id, order: b.series_order }));
  
  await Series.updateOne({ _id: seriesId }, { $set: { articles: articlesArray } });

  console.log('Done mapping series to blogs!');
  process.exit(0);
}

seed().catch(console.error);
