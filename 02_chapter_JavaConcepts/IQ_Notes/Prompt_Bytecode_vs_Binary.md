Explain the difference between bytecode and binary/machine code using the file `01_chapter_Javascript/02_letConcept.js` as an example.

Walk through:
1. What V8 bytecode is generated for this script
2. How bytecode differs from the original JavaScript source
3. What raw ARM64 machine code would look like when TurboFan JIT-compiles the hot loop
4. The pipeline: Source → AST → Bytecode → Machine Code
