crystal_doc_search_index_callback({"repository_name":"hash_serializable","body":"# hash_serializable\n\n![Send.cr CI](https://img.shields.io/github/workflow/status/wyhaines/hash_serializable.cr/hash_serializable%20CI?style=for-the-badge&logo=GitHub)\n[![GitHub release](https://img.shields.io/github/release/wyhaines/hash_sedrializable.cr.svg?style=for-the-badge)](https://github.com/wyhaines/hash_serializable.cr/releases)\n![GitHub commits since latest release (by SemVer)](https://img.shields.io/github/commits-since/wyhaines/hash_serializable.cr/latest?style=for-the-badge)\n\nIt can be useful to be able to serialize and deserialize between hashes\nand objects the same way that one can between JSON and objects and YAML\nand objects. This implementation is aiming to be feature-consistent with\nJSON::Serializable and YAML::Serializable, while working with hashes.\n\nThe `Hash::Serializable` module automatically generates methods for serialization when included.\n\n### Example\n\n```crystal\nrequire \"hash_serializable\"\n\nclass Note\n  include Hash::Serializable\n\n  property message : String = \"DEFAULT\"\nend\n\nclass Location\n  include Hash::Serializable\n\n  @[Hash::Field(key: \"lat\")]\n  property latitude : Float64\n\n  @[Hash::Field(key: \"lon\")]\n  property longitude : Float64\n\n  property note : Note\nend\n\nclass House\n  include Hash::Serializable\n\n  property address : String\n  property location : Location?\n  property note : Note\nend\n\narg = {\n  \"note\" => {\n    \"message\" => \"Nice Address\",\n  },\n  \"address\"  => \"Crystal Road 1234\",\n  \"location\" => {\n    \"lat\"  => 12.3,\n    \"lon\"  => 34.5,\n    \"note\" => {\n      \"message\" => \"hmmmm\",\n    },\n  },\n}\nhouse = House.from_hash(arg)\n\nhouse.is_a?(House).should be_true\nhouse.address.should eq \"Crystal Road 1234\"\nhouse.location.is_a?(Location).should be_true\nhouse.location.not_nil!.latitude.should eq 12.3\nhouse.location.not_nil!.longitude.should eq 34.5\nhouse.note.message.should eq \"Nice Address\"\nhouse.location.not_nil!.note.message.should eq \"hmmmm\"\nhouse.to_hash.should eq arg\n```\n\n## Installation\n\n1. Add the dependency to your `shard.yml`:\n\n   ```yaml\n   dependencies:\n     hash_serializable:\n       github: your-github-user/hash_serializable\n   ```\n\n2. Run `shards install`\n\n## Usage\n\nIncluding `Hash::Serializable` will create `#to_hash` and `self.from_hash` methods\non the current class, and a constructor which takes a Hash. By default, `self.from_hash`\nwill deserialize a Hash into an instance of the object that it is passed to, according\nto the definition of the class, and `#to_hash` will serialize the class into a Hash\ncontaining the value of every instance variable, the keys being the instance variable\nnames.\n\nIt will descend through a nested class structure, where variables in one class\npoint to objects that, in turn, have instance variables. It should also deal correctly\nwith type unions.\n\nTo change how individual instance variables are parsed and serialized, the annotation\n`Hash::Field` can be placed on the instance variable. Annotating property, getter, and\nsetter macros is also allowed.\n\n```\nrequire \"hash_serializable\"\n\nstruct A\n  include Hash::Serializable\n\n  @[Hash::Field(key: \"my_key\")]\n  getter a : Int32?\nend\n```\n\n`Hash::Field` properties:\n* **ignore**: if `true` skip this field in serialization and deserialization (by default false)\n* **ignore_serialize**: if `true` skip this field in serialization (by default false)\n* **ignore_deserialize**: if `true` skip this field in deserialization (by default false)\n* **key**: the value of the key in the json object (by default the name of the instance variable)\n* **presence**: if `true`, a `@{{key}}_present` instance variable will be generated when the key was present (even if it has a `null` value), `false` by default; this does not declare the `@{{key}}_present` variable for you, so you will be responsible for ensuring that a Bool variable is declared\n\nDeserialization respects default values of variables.\n\n### Extensions: `Hash::Serializable::Strict` and `Hash::Serializable::Unmapped`\n\nIf the `Hash::Serializable::Strict` module is included, unknown properties in the Hash\ndocument will raise an exception. By default the unknown properties are silently ignored.\n\nIf the `Hash::Serializable::Unmapped` module is included, unknown properties in the Hash\nwill be stored in a hash with an appropriate type signature. On serialization, any keys inside json_unmapped\nwill be serialized into the hash, as well.\n\n```\nrequire \"hash_serializable\"\n\nstruct A\n  include Hash::Serializable\n  include Hash::Serializable::Unmapped\n  @a : Int32\nend\n\na = A.from_json(%({\"a\":1,\"b\":2})) # => A(@json_unmapped={\"b\" => 2_i64}, @a=1)\na.to_json                         # => {\"a\":1,\"b\":2}\n```\n\nTODO: Write usage instructions here\n\n## Development\n\nTODO: Write development instructions here\n\n## Contributing\n\n1. Fork it (<https://github.com/wyhaines/hash_serializable/fork>)\n2. Create your feature branch (`git checkout -b my-new-feature`)\n3. Commit your changes (`git commit -am 'Add some feature'`)\n4. Push to the branch (`git push origin my-new-feature`)\n5. Create a new Pull Request\n\n## Contributors\n\n- [Kirk Haines](https://github.com/wyhaines) - creator and maintainer\n\n![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/wyhaines/hash_serializable.cr?style=for-the-badge)\n![GitHub issues](https://img.shields.io/github/issues/wyhaines/hash_serializable.cr?style=for-the-badge)","program":{"html_id":"hash_serializable/toplevel","path":"toplevel.html","kind":"module","full_name":"Top Level Namespace","name":"Top Level Namespace","abstract":false,"superclass":null,"ancestors":[],"locations":[],"repository_name":"hash_serializable","program":true,"enum":false,"alias":false,"aliased":null,"aliased_html":null,"const":false,"constants":[],"included_modules":[],"extended_modules":[],"subclasses":[],"including_types":[],"namespace":null,"doc":null,"summary":null,"class_methods":[],"constructors":[],"instance_methods":[],"macros":[],"types":[{"html_id":"hash_serializable/Hash","path":"Hash.html","kind":"class","full_name":"Hash(K, V)","name":"Hash","abstract":false,"superclass":{"html_id":"hash_serializable/Reference","kind":"class","full_name":"Reference","name":"Reference"},"ancestors":[{"html_id":"hash_serializable/Iterable","kind":"module","full_name":"Iterable","name":"Iterable"},{"html_id":"hash_serializable/Enumerable","kind":"module","full_name":"Enumerable","name":"Enumerable"},{"html_id":"hash_serializable/Reference","kind":"class","full_name":"Reference","name":"Reference"},{"html_id":"hash_serializable/Object","kind":"class","full_name":"Object","name":"Object"}],"locations":[{"filename":"src/hash_serializable.cr","line_number":1,"url":null}],"repository_name":"hash_serializable","program":false,"enum":false,"alias":false,"aliased":null,"aliased_html":null,"const":false,"constants":[],"included_modules":[{"html_id":"hash_serializable/Enumerable","kind":"module","full_name":"Enumerable","name":"Enumerable"},{"html_id":"hash_serializable/Iterable","kind":"module","full_name":"Iterable","name":"Iterable"}],"extended_modules":[],"subclasses":[],"including_types":[],"namespace":null,"doc":"A `Hash` represents a collection of key-value mappings, similar to a dictionary.\n\nMain operations are storing a key-value mapping (`#[]=`) and\nquerying the value associated to a key (`#[]`). Key-value mappings can also be\ndeleted (`#delete`).\nKeys are unique within a hash. When adding a key-value mapping with a key that\nis already in use, the old value will be forgotten.\n\n```\n# Create a new Hash for mapping String to Int32\nhash = Hash(String, Int32).new\nhash[\"one\"] = 1\nhash[\"two\"] = 2\nhash[\"one\"] # => 1\n```\n\n[Hash literals](https://crystal-lang.org/reference/syntax_and_semantics/literals/hash.html)\ncan also be used to create a `Hash`:\n\n```\n{\"one\" => 1, \"two\" => 2}\n```\n\nImplementation is based on an open hash table.\nTwo objects refer to the same hash key when their hash value (`Object#hash`)\nis identical and both objects are equal to each other (`Object#==`).\n\nEnumeration follows the order that the corresponding keys were inserted.\n\nNOTE: When using mutable data types as keys, changing the value of a key after\nit was inserted into the `Hash` may lead to undefined behaviour. This can be\nrestored by re-indexing the hash with `#rehash`.","summary":"<p>A <code><a href=\"Hash.html\">Hash</a></code> represents a collection of key-value mappings, similar to a dictionary.</p>","class_methods":[],"constructors":[],"instance_methods":[],"macros":[],"types":[{"html_id":"hash_serializable/Hash/Field","path":"Hash/Field.html","kind":"annotation","full_name":"Hash::Field","name":"Field","abstract":false,"superclass":null,"ancestors":[],"locations":[{"filename":"src/hash_serializable.cr","line_number":2,"url":null}],"repository_name":"hash_serializable","program":false,"enum":false,"alias":false,"aliased":null,"aliased_html":null,"const":false,"constants":[],"included_modules":[],"extended_modules":[],"subclasses":[],"including_types":[],"namespace":{"html_id":"hash_serializable/Hash","kind":"class","full_name":"Hash(K, V)","name":"Hash"},"doc":null,"summary":null,"class_methods":[],"constructors":[],"instance_methods":[],"macros":[],"types":[]},{"html_id":"hash_serializable/Hash/Serializable","path":"Hash/Serializable.html","kind":"module","full_name":"Hash::Serializable","name":"Serializable","abstract":false,"superclass":null,"ancestors":[],"locations":[{"filename":"src/hash_serializable.cr","line_number":120,"url":null}],"repository_name":"hash_serializable","program":false,"enum":false,"alias":false,"aliased":null,"aliased_html":null,"const":false,"constants":[{"id":"VERSION","name":"VERSION","value":"\"0.1.0\"","doc":null,"summary":null}],"included_modules":[],"extended_modules":[],"subclasses":[],"including_types":[],"namespace":{"html_id":"hash_serializable/Hash","kind":"class","full_name":"Hash(K, V)","name":"Hash"},"doc":null,"summary":null,"class_methods":[],"constructors":[{"id":"new(hash:U)forallU-class-method","html_id":"new(hash:U)forallU-class-method","name":"new","doc":null,"summary":null,"abstract":false,"args":[{"name":"hash","doc":null,"default_value":"","external_name":"hash","restriction":"U"}],"args_string":"(hash : U) forall U","args_html":"(hash : U) forall U","location":{"filename":"src/hash_serializable.cr","line_number":154,"url":null},"def":{"name":"new","args":[{"name":"hash","doc":null,"default_value":"","external_name":"hash","restriction":"U"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"_ = allocate\n_.initialize(hash)\nif _.responds_to?(:finalize)\n  ::GC.add_finalizer(_)\nend\n_\n"}}],"instance_methods":[{"id":"to_hash-instance-method","html_id":"to_hash-instance-method","name":"to_hash","doc":null,"summary":null,"abstract":false,"args":[],"args_string":"","args_html":"","location":{"filename":"src/hash_serializable.cr","line_number":259,"url":null},"def":{"name":"to_hash","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"{% if true %}\n        {% tstack = [] of Nil\nostack = [] of Nil\nestack = [] of Nil\ntstack << ([] of Nil)\nostack << @type.instance_vars\nestack << (0..(@type.instance_vars.size - 1)).to_a\n(1..99999).each do\n  if !ostack.empty?\n    o = ostack.last\n    oo = ostack\n    ostack = [] of Nil\n    (0..(oo.size - 2)).each do |idx|\n      ostack << oo[idx]\n    end\n    keys = estack.last\n    oe = estack\n    estack = [] of Nil\n    (0..(oe.size - 2)).each do |idx|\n      estack << oe[idx]\n    end\n    if (!keys.nil?) && (!keys.empty?)\n      (1..99999).each do\n        if (!keys.nil?) && (!keys.empty?)\n          e = keys.first\n          ok = keys\n          keys = [] of Nil\n          (1..(ok.size - 1)).each do |idx|\n            keys << ok[idx]\n          end\n          if o[e].type.union_types.reject do |typ|\n            typ == Nil\n          end.first.class.methods.map do |__arg3|\n            __arg3.name.stringify\n          end.includes?(\"from_hash\")\n            oe = o[e].type.union_types.reject do |typ|\n              typ == Nil\n            end.first\n            tstack << ([] of Nil)\n            ostack << o\n            estack << keys\n            ostack << oe.instance_vars\n            estack << (0..(oe.instance_vars.size - 1)).to_a\n            keys = [] of Nil\n          else\n            if o[e].type.nilable?\n              tstack.last << \"#{o[e].type} | Nil\"\n            else\n              tstack.last << o[e].type\n            end\n            if keys.empty? && tstack.size > 1\n              ot = tstack\n              top = tstack.last\n              tstack = [] of Nil\n              (0..(ot.size - 2)).each do |idx|\n                tstack << ot[idx]\n              end\n              tstack.last << top\n              tstack.last << Nil\n            end\n          end\n        end\n      end\n    else\n      if tstack.size > 1\n        ot = tstack\n        top = tstack.last\n        tstack = [] of Nil\n        (0..(ot.size - 2)).each do |idx|\n          tstack << ot[idx]\n        end\n        tstack.last << top\n      end\n    end\n  end\nend\ntypes = {} of TypeNode => Bool\ntstack.first.each do |type|\n  types[type] = true\nend\ntype_string = (((((types.keys.map do |m|\n  m.id\nend.join(\" | \")).id.gsub(/\\s*,\\s*/, \" | \")).gsub(/\\[/, \"Hash(String, \")).gsub(/]/, \")\")).gsub(/Hash\\(String\\s*\\|/, \"Hash(String, \")).id\n %}\n\n        h = {} of String => ({{ type_string }})\n        {% for ivar in @type.instance_vars %}\n          {% ann = ivar.annotation(::Hash::Field)\nkey = ((ann && ann[:key]) || ivar).id.stringify\n %}\n          {% if ann && (ann[:ignore] || ann[:ignore_serialize]) %}{% else %}\n            {{ ivar.name }}_ivar = @{{ ivar.name }}\n            if {{ ivar.name }}_ivar.responds_to?(:to_hash)\n              h[{{ key }}] = {{ ivar.name }}_ivar.to_hash\n            else\n              h[{{ key }}] = {{ ivar.name }}_ivar\n            end\n          {% end %}\n        {% end %}\n        {% if @type.instance_vars.select do |iv|\n  iv.name.stringify == \"hash_unmapped\"\nend.empty? %}\n          h\n        {% else %}\n          h.merge(@hash_unmapped)\n        {% end %}\n      {% end %}"}}],"macros":[],"types":[{"html_id":"hash_serializable/Hash/Serializable/Strict","path":"Hash/Serializable/Strict.html","kind":"module","full_name":"Hash::Serializable::Strict","name":"Strict","abstract":false,"superclass":null,"ancestors":[],"locations":[{"filename":"src/hash_serializable.cr","line_number":376,"url":null}],"repository_name":"hash_serializable","program":false,"enum":false,"alias":false,"aliased":null,"aliased_html":null,"const":false,"constants":[],"included_modules":[],"extended_modules":[],"subclasses":[],"including_types":[],"namespace":{"html_id":"hash_serializable/Hash/Serializable","kind":"module","full_name":"Hash::Serializable","name":"Serializable"},"doc":null,"summary":null,"class_methods":[],"constructors":[],"instance_methods":[],"macros":[],"types":[]},{"html_id":"hash_serializable/Hash/Serializable/Unmapped","path":"Hash/Serializable/Unmapped.html","kind":"module","full_name":"Hash::Serializable::Unmapped(K)","name":"Unmapped","abstract":false,"superclass":null,"ancestors":[],"locations":[{"filename":"src/hash_serializable.cr","line_number":382,"url":null}],"repository_name":"hash_serializable","program":false,"enum":false,"alias":false,"aliased":null,"aliased_html":null,"const":false,"constants":[],"included_modules":[],"extended_modules":[],"subclasses":[],"including_types":[],"namespace":{"html_id":"hash_serializable/Hash/Serializable","kind":"module","full_name":"Hash::Serializable","name":"Serializable"},"doc":null,"summary":null,"class_methods":[],"constructors":[],"instance_methods":[{"id":"hash_unmapped-instance-method","html_id":"hash_unmapped-instance-method","name":"hash_unmapped","doc":null,"summary":null,"abstract":false,"args":[],"args_string":"","args_html":"","location":{"filename":"src/hash_serializable.cr","line_number":384,"url":null},"def":{"name":"hash_unmapped","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"@hash_unmapped"}},{"id":"hash_unmapped=(hash_unmapped)-instance-method","html_id":"hash_unmapped=(hash_unmapped)-instance-method","name":"hash_unmapped=","doc":null,"summary":null,"abstract":false,"args":[{"name":"hash_unmapped","doc":null,"default_value":"","external_name":"hash_unmapped","restriction":""}],"args_string":"(hash_unmapped)","args_html":"(hash_unmapped)","location":{"filename":"src/hash_serializable.cr","line_number":384,"url":null},"def":{"name":"hash_unmapped=","args":[{"name":"hash_unmapped","doc":null,"default_value":"","external_name":"hash_unmapped","restriction":""}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"@hash_unmapped = hash_unmapped"}}],"macros":[],"types":[]}]},{"html_id":"hash_serializable/Hash/SerializableError","path":"Hash/SerializableError.html","kind":"class","full_name":"Hash::SerializableError","name":"SerializableError","abstract":false,"superclass":{"html_id":"hash_serializable/Exception","kind":"class","full_name":"Exception","name":"Exception"},"ancestors":[{"html_id":"hash_serializable/Exception","kind":"class","full_name":"Exception","name":"Exception"},{"html_id":"hash_serializable/Reference","kind":"class","full_name":"Reference","name":"Reference"},{"html_id":"hash_serializable/Object","kind":"class","full_name":"Object","name":"Object"}],"locations":[{"filename":"src/hash_serializable.cr","line_number":392,"url":null}],"repository_name":"hash_serializable","program":false,"enum":false,"alias":false,"aliased":null,"aliased_html":null,"const":false,"constants":[],"included_modules":[],"extended_modules":[],"subclasses":[],"including_types":[],"namespace":{"html_id":"hash_serializable/Hash","kind":"class","full_name":"Hash(K, V)","name":"Hash"},"doc":null,"summary":null,"class_methods":[],"constructors":[{"id":"new(message:String?,klass:String,attribute:String?=nil)-class-method","html_id":"new(message:String?,klass:String,attribute:String?=nil)-class-method","name":"new","doc":null,"summary":null,"abstract":false,"args":[{"name":"message","doc":null,"default_value":"","external_name":"message","restriction":"String | ::Nil"},{"name":"klass","doc":null,"default_value":"","external_name":"klass","restriction":"String"},{"name":"attribute","doc":null,"default_value":"nil","external_name":"attribute","restriction":"String | ::Nil"}],"args_string":"(message : String?, klass : String, attribute : String? = <span class=\"n\">nil</span>)","args_html":"(message : String?, klass : String, attribute : String? = <span class=\"n\">nil</span>)","location":{"filename":"src/hash_serializable.cr","line_number":396,"url":null},"def":{"name":"new","args":[{"name":"message","doc":null,"default_value":"","external_name":"message","restriction":"String | ::Nil"},{"name":"klass","doc":null,"default_value":"","external_name":"klass","restriction":"String"},{"name":"attribute","doc":null,"default_value":"nil","external_name":"attribute","restriction":"String | ::Nil"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"_ = allocate\n_.initialize(message, klass, attribute)\nif _.responds_to?(:finalize)\n  ::GC.add_finalizer(_)\nend\n_\n"}}],"instance_methods":[{"id":"attribute:String?-instance-method","html_id":"attribute:String?-instance-method","name":"attribute","doc":null,"summary":null,"abstract":false,"args":[],"args_string":" : String?","args_html":" : String?","location":{"filename":"src/hash_serializable.cr","line_number":394,"url":null},"def":{"name":"attribute","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"String | ::Nil","visibility":"Public","body":"@attribute"}},{"id":"klass:String-instance-method","html_id":"klass:String-instance-method","name":"klass","doc":null,"summary":null,"abstract":false,"args":[],"args_string":" : String","args_html":" : String","location":{"filename":"src/hash_serializable.cr","line_number":393,"url":null},"def":{"name":"klass","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"String","visibility":"Public","body":"@klass"}}],"macros":[],"types":[]}]}]}})