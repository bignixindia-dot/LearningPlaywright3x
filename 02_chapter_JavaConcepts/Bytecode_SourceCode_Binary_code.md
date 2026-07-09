# Bytecode vs Source Code vs Binary/Machine Code

## Source Code (JavaScript)

File: `01_chapter_Javascript/02_letConcept.js`

```javascript
let a = 10;
console.log(a);

for (let a=0; a<=100000 ; a++)
{
    console.log(a);
}
```

High-level, human-readable. The V8 parser tokenizes this into an AST, then the Ignition interpreter compiles the AST into **bytecode**.

---

## Bytecode (V8 Ignition)

Generated at parse time — always produced before any code executes. These are **abstract VM instructions** that the V8 interpreter steps through one by one.

```
[top-level script]
@ 0 :  CreateClosure [0], [0], #0     // create the function scope
@ 4 :  Return                          // return from it

[main function body]
@ 0 :  GetNamedProperty a3, [0]        // get console.log
@ 4 :  Star0                           // store to register r0
@ 5 :  LdaConstant [1]                 // load "10"
@ 7 :  Star8                           // store to register r8
@ 8 :  CallUndefinedReceiver1          // console.log(10)

[loop: for (let a=0; a<=100000; a++)]
@ 49 : LdaConstant [8]                 // load loop body string
@ 52 : CallUndefinedReceiver1          // call the loop function
@ 57 : Ldar r5                         // load accumulator from r5
@ 59 : ToBooleanLogicalNot             // check loop condition
@ 61 : CallUndefinedReceiver1          // continue or break
@ 83 : Ldar r5                         // load a
@ 85 : JumpIfToBooleanFalse [9]        // jump if condition is false
@ 87 : LdaConstant [8]                 // reload body
@ 90 : CallUndefinedReceiver1          // call again (iteration)
@ 94 : LdaConstant [11]                // load end string
...
@ 118: Return
```

Each opcode like `LdaConstant`, `GetNamedProperty`, `CallUndefinedReceiver1` is a **1-byte or 2-byte operation code** followed by operands. Bytecode is:
- **Portable** — same on ARM64, x64, x86
- **Compact** — ~119 bytes for the entire script
- **Interpreted** — the Ignition interpreter decodes and executes each opcode

---

## Binary / Machine Code (ARM64 — TurboFan JIT)

When the `for` loop runs 100,000 times, V8's TurboFan compiler notices it's "hot" and **JIT-compiles** the bytecode into raw ARM64 machine code. This runs directly on the CPU without any interpreter overhead.

```
0x100e43000:  d28000a0  mov  x0, #0x5          // move 5 into register x0
0x100e43004:  dac00000  clz  x0, x0            // count leading zeros
0x100e43008:  93407c00  sxtw x0, w0            // sign-extend word
0x100e4300c:  f90007e0  str  x0, [sp, #8]      // store x0 to stack
0x100e43010:  f94007e0  ldr  x0, [sp, #8]      // load from stack to x0
0x100e43014:  eb01001f  cmp  x0, x1            // compare x0 with x1
0x100e43018:  54ffff6b  b.lt 0x100e43004       // branch if less than (loop back)
```

Each instruction is a **fixed 4 bytes** on ARM64. The hex `d28000a0` is the actual binary encoding that the CPU's instruction decoder turns into transistor signals.

---

## Comparison

| Layer | Abstraction | Size | Speed | Portability | Who runs it |
|---|---|---|---|---|---|
| **Source code** | Highest | 8 lines | — | Portable | Humans |
| **Bytecode** | Medium | ~119 bytes | ~1x (baseline) | Portable across CPUs | V8 Ignition (interpreter) |
| **Binary code** | Lowest (hardware level) | 4 bytes per instruction | ~1000x faster | CPU-specific (ARM64 vs x64) | CPU directly |

## Pipeline

```
Source Code (JS)
      ↓ Parser
    AST (Abstract Syntax Tree)
      ↓ Ignition
    Bytecode (portable VM instructions)   ← always produced
      ↓ TurboFan (when code is hot)
    Machine Code (raw CPU instructions)   ← only for optimized paths
```

On your Apple Silicon Mac (ARM64), the bytecode is the same as it would be on an Intel Mac or a Linux x64 server. But the **binary code** TurboFan spits out is completely different — `d28000a0` (ARM64) vs `b8 05 00 00 00` (x64 `mov eax, 5`).
